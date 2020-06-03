export const getTwitterId = (url: string) => url.match(/status\/(\d{19})/)?.[1];

const COMPLETE_THRESHOLD = 1;

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
