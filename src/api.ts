import * as firebase from 'firebase/app';
import { getTwitterId, getIgId } from './util';

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

export const createPost = async (postUrl: string): Promise<Post> => {
  if (!postUrl) {
    throw new Error('A link is required');
  }

  const postId = getTwitterId(postUrl) || getIgId(postUrl);
  if (!postId) {
    throw new Error('Link is not a valid url');
  }

  const postParams: Omit<Post, 'id'> = {
    approvedAt: new Date(),
    completers: [],
    createdAt: new Date(),
    createdBy: firebase.auth().currentUser?.uid,
    reporters: [],
    postUrl,
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

export const reportPost = async (postId: string) => {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    await firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .update({
        reporters: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      });
    sendSlack(`User '${currentUser.uid}' reported post '${postId}'`);
    return currentUser.uid;
  }

  return null;
};

const sendSlack = (text: string) => {
  const slackWebhookUrl = process.env.REACT_APP_SLACK_WEBHOOK_URL;
  if (slackWebhookUrl) {
    fetch(slackWebhookUrl, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }
};
