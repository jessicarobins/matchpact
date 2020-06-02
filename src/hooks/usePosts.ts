import React from 'react';
import * as api from '../api';
import { getTwitterId } from '../util';

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
    if (post.completedAt) {
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
    const updatedPostParams = await api.completePost(posts[tweetId].id);
    setPosts((prevValue) => ({
      ...prevValue,
      [tweetId]: { ...prevValue.postId, ...updatedPostParams },
    }));
  };

  return [groupedPosts, { addPost, completePost }];
};
