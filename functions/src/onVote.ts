import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp();

const db = admin.firestore();

export const onVote = functions.firestore
  .document('users/{userId}/votes/{postId}')
  .onWrite((change, context) => {
    const { postId, userId } = context.params;
    const newValue = change.after.data();

    const postDocRef = db.collection('posts').doc(postId);
    return postDocRef.update({ [`votes.${userId}`]: newValue?.truth });
  });
