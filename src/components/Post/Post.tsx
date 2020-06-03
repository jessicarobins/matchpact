import React, { FC } from 'react';
import TweetEmbed from 'react-tweet-embed';
import { getTwitterId } from '../../util';
import './Post.css';

type Props = {
  onComplete?: (tweetId: string) => void;
  onReport: (tweetId: string) => void;
  post: Post;
  userUid: string;
};

const Post: FC<Props> = (props: Props) => {
  const tweetId = getTwitterId(props.post.tweetUrl);

  if (
    !tweetId ||
    !props.post.approvedAt ||
    props.post.reporters?.includes(props.userUid)
  ) {
    return null;
  }

  const handleComplete = () => props.onComplete?.(tweetId);
  const handleReport = () => props.onReport(tweetId);

  return (
    <div className="post" id={props.post.id}>
      <TweetEmbed id={tweetId} options={{ cards: 'hidden', width: 300 }} />
      <div className="post-buttons">
        {props.onComplete && (
          <button className="button is-success" onClick={handleComplete}>
            Mark Complete
          </button>
        )}
        <button className="button is-danger" onClick={handleReport}>
          Report
        </button>
      </div>
    </div>
  );
};

export default Post;
