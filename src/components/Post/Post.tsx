import React, { FC } from 'react';
import { getTwitterId, getIgId } from '../../util';
import Tweet from './Tweet';
import InstagramEmbed from './Instagram';
import './Post.css';

type Props = {
  onComplete?: (postId: string) => void;
  onReport: (postId: string) => void;
  post: Post;
  userUid: string;
};

const Post: FC<Props> = (props: Props) => {
  const postId = getTwitterId(props.post.postUrl) || getIgId(props.post.postUrl);

  if (
    !postId ||
    !props.post.approvedAt ||
    props.post.reporters?.includes(props.userUid)
  ) {
    return null;
  }

  const handleComplete = () => props.onComplete?.(postId);
  const handleReport = () => props.onReport(postId);

  if (props.post.postUrl.startsWith('https://twitter.com')) {
    return (
      <div className="post" id={props.post.id}>
        <Tweet tweetId={postId} tweetUrl={props.post.postUrl} />
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
  }

  // if (props.post.postUrl.startsWith('https://instagram.com')) {
  return (
    <div className="post" id={props.post.id}>
      <InstagramEmbed igId={postId} igUrl={props.post.postUrl} />
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
  // }

};

export default Post;
