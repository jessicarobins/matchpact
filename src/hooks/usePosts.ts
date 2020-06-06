import React from 'react';
import * as firebase from 'firebase/app';
import * as api from '../api';
import { getTwitterId, getIgId, isComplete } from '../util';

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
  reportPost: (postId: string) => void;
}

export const usePosts = (): [GroupedPosts, UsePostApi] => {
  const [posts, setPosts] = React.useState({} as PostMap);
  const userUid = firebase.auth().currentUser?.uid;

  React.useEffect(() => {
    async function getPosts() {
      const posts = await api.fetchPosts();
      const postMap = posts.reduce((acc, post) => {
        const twitterId = getTwitterId(post.postUrl);
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
    const postId = getTwitterId(text) || getIgId(text);
    if (!postId) {
      throw new Error('Link is not a valid url');
    }
    if (posts[postId]) {
      throw new Error('Post already exists');
    }

    const post = await api.createPost(text);
    setPosts((prevValue) => ({
      [postId]: post,
      ...prevValue,
    }));
  };

  const completePost = async (postId: string) => {
    const userUid = await api.completePost(posts[postId].id);
    if (userUid) {
      setPosts((prevValue) => ({
        ...prevValue,
        [postId]: {
          ...prevValue[postId],
          completers: [...(prevValue[postId].completers ?? []), userUid],
        },
      }));
    }
  };

  const reportPost = async (postId: string) => {
    const userUid = await api.reportPost(posts[postId].id);
    if (userUid) {
      setPosts((prevValue) => ({
        ...prevValue,
        [postId]: {
          ...prevValue[postId],
          reporters: [...(prevValue[postId].reporters ?? []), userUid],
        },
      }));
    }
  };

  return [groupedPosts, { addPost, completePost, reportPost }];
};
