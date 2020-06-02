import React, { FC } from 'react';
import TweetEmbed from 'react-tweet-embed';
import { getTwitterId } from '../../util';
import './Post.css';

type Props = {
  onComplete?: (postId: string) => void;
  post: Post;
};

const Post: FC<Props> = (props: Props) => {
  const tweetId = getTwitterId(props.post.tweetUrl);

  if (!tweetId || !props.post.approvedAt) {
    return null;
  }

  const handleComplete = () => props.onComplete?.(tweetId);

  return (
    <div className="post" id={props.post.id}>
      <TweetEmbed id={tweetId} options={{ cards: 'hidden', width: 300 }} />
      {props.onComplete && (
        <button className="button is-success" onClick={handleComplete}>
          Mark Complete
        </button>
      )}
    </div>
  );
};

export default Post;
