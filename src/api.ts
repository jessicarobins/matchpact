import * as firebase from 'firebase/app';

export const fetchVotes = async (): Promise<VoteMap> => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    return {};
  }

  const votes = {} as VoteMap;
  const snapshot = await firebase
    .firestore()
    .collection('users')
    .doc(currentUser.uid)
    .collection('votes')
    .get();

  snapshot.forEach(function (doc) {
    const vote = { ...doc.data(), id: doc.id } as Vote;
    votes[doc.id] = vote;
  });

  return votes;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const posts = [] as Post[];
  const snapshot = await firebase.firestore().collection('posts').get();
  snapshot.forEach(function (doc) {
    const post = { ...doc.data(), id: doc.id } as Post;
    posts.push(post);
  });

  return posts;
};

export const createPost = async (text: string): Promise<Post> => {
  const docRef = await firebase.firestore().collection('posts').add({
    createdAt: new Date(),
    text,
    userUid: firebase.auth().currentUser?.uid,
    votes: {},
  });
  const doc = await docRef.get();

  const post = { ...doc.data(), id: docRef.id } as Post;
  return post;
};

export const setVote = async (postId: string, truth: boolean) => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    return {};
  }

  return firebase
    .firestore()
    .collection('users')
    .doc(currentUser.uid)
    .collection('votes')
    .doc(postId)
    .set({
      createdAt: new Date(),
      truth,
    });
};
