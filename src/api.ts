import * as firebase from 'firebase/app';

export const fetchPosts = async (): Promise<Post[]> => {
  const posts = [] as Post[];
  const snapshot = await firebase.firestore().collection('posts').get();
  snapshot.forEach(function (doc) {
    const post = { ...doc.data(), id: doc.id } as Post;
    posts.push(post);
  });

  return posts;
};

export const createPost = async (tweetUrl: string): Promise<Post> => {
  const postParams: Omit<Post, 'id'> = {
    approvedAt: new Date(),
    createdAt: new Date(),
    createdBy: firebase.auth().currentUser?.uid,
    tweetUrl,
  };

  const docRef = await firebase.firestore().collection('posts').add(postParams);
  const doc = await docRef.get();

  const post = { ...doc.data(), id: docRef.id } as Post;
  return post;
};

export const completePost = async (postId: string): Promise<void> =>
  firebase
    .firestore()
    .collection('posts')
    .doc(postId)
    .update({
      completedAt: new Date(),
      completedBy: firebase.auth().currentUser?.uid,
    });
