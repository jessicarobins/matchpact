export const getTwitterId = (url: string) => url.match(/twitter\.com\/[a-zA-Z0-9_]{1,15}\/status\/(\d{19})/)?.[1];
export const getIgId = (url: string) => url.match(/instagram.com\/p\/([a-zA-Z0-9]{11})/)?.[1];

const COMPLETE_THRESHOLD = 0;

export const isComplete = (post: Post, userUid?: string) => {
  if (post.completedAt) {
    return true;
  }

  if (!post.completers?.length) {
    return false;
  }

  if (post.completers.length > COMPLETE_THRESHOLD) {
    return true;
  }

  if (userUid && post.completers.includes(userUid)) {
    return true;
  }

  return false;
};
