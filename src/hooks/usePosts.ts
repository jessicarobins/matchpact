import React from 'react';
import * as firebase from 'firebase/app';
import * as api from '../api';
import { getTwitterId, isComplete } from '../util';

interface GroupedPosts {
  complete: Post[];
  incomplete: Post[];
}

interface PostMap {
  [twitterId: string]: Post;
}

export interface UsePostApi {
  addPost: (text: string) => void;
  completePost: (postId: string) => void;
}

export const usePosts = (): [GroupedPosts, UsePostApi] => {
  const [posts, setPosts] = React.useState({} as PostMap);
  const userUid = firebase.auth().currentUser?.uid;

  React.useEffect(() => {
    async function getPosts() {
      const posts = await api.fetchPosts();
      const postMap = posts.reduce((acc, post) => {
        const twitterId = getTwitterId(post.tweetUrl);
        if (!twitterId) return acc;

        return { ...acc, [twitterId]: post };
      }, {});
      setPosts(postMap);
    }

    getPosts();
  }, []);

  const groupedPosts = { complete: [], incomplete: [] } as GroupedPosts;
  Object.values(posts).forEach((post) => {
    if (isComplete(post, userUid)) {
      groupedPosts.complete.push(post);
    } else {
      groupedPosts.incomplete.push(post);
    }
  });

  const addPost = async (text: string) => {
    const twitterId = getTwitterId(text);
    if (!twitterId) {
      throw new Error('Link is not a valid Twitter url');
    }
    if (posts[twitterId]) {
      throw new Error('Tweet already exists');
    }

    const post = await api.createPost(text);
    setPosts((prevValue) => ({
      [twitterId]: post,
      ...prevValue,
    }));
  };

  const completePost = async (tweetId: string) => {
    const userUid = await api.completePost(posts[tweetId].id);
    if (userUid) {
      setPosts((prevValue) => ({
        ...prevValue,
        [tweetId]: {
          ...prevValue[tweetId],
          completers: [...(prevValue[tweetId].completers ?? []), userUid],
        },
      }));
    }
  };

  return [groupedPosts, { addPost, completePost }];
};
