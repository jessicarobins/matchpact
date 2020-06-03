import * as firebase from 'firebase/app';
import { getTwitterId } from './util';

export const fetchPosts = async (): Promise<Post[]> => {
  const posts = [] as Post[];
  const snapshot = await firebase
    .firestore()
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .get();
  snapshot.forEach(function (doc) {
    const post = { ...doc.data(), id: doc.id } as Post;
    posts.push(post);
  });

  return posts;
};

export const createPost = async (tweetUrl: string): Promise<Post> => {
  if (!tweetUrl) {
    throw new Error('Tweet url is required');
  }

  const twitterId = getTwitterId(tweetUrl);
  if (!twitterId) {
    throw new Error('Link is not a valid Twitter url');
  }

  const postParams: Omit<Post, 'id'> = {
    approvedAt: new Date(),
    completers: [],
    createdAt: new Date(),
    createdBy: firebase.auth().currentUser?.uid,
    reporters: [],
    tweetUrl,
  };

  const docRef = await firebase.firestore().collection('posts').add(postParams);
  const doc = await docRef.get();

  const post = { ...doc.data(), id: docRef.id } as Post;
  return post;
};

export const completePost = async (postId: string): Promise<string | null> => {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    await firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .update({
        completers: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      });
    return currentUser.uid;
  }

  return null;
};
