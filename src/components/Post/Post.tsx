import React, { FC } from 'react';
import './Post.css';

type Props = {
  onComplete: (postId: string) => void;
  post: Post;
};

const Post: FC<Props> = (props: Props) => {
  const handleComplete = () => props.onComplete(props.post.id);

  return (
    <div className="card post">
      <div className="card-content">
        <p className="title is-4">{props.post.tweetUrl}</p>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <button className="button is-success" onClick={handleComplete}>
            <span className="icon">
              <i className="fas fa-thumbs-up"></i>
            </span>
            <span>Mark Complete</span>
          </button>
        </p>
      </footer>
    </div>
  );
};

export default Post;
