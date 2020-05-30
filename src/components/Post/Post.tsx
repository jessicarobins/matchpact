import React, { FC } from 'react';
import './Post.css';

type Props = {
  onVote: (postId: string, vote: boolean) => void;
  post: Post;
  vote: Vote;
};

const Post: FC<Props> = (props: Props) => {
  const votes = Object.values(props.post.votes);
  const truths = votes.filter(Boolean).length;
  const gaslights = votes.length - truths;
  const isTruth = truths > gaslights;
  const isGaslight = gaslights > truths;
  const vote = props.vote?.truth;

  return (
    <div className="card post">
      <div className="card-content">
        <div className="is-flex vote-container">
          <p
            className={`subtitle is-flex ${
              isTruth
                ? 'has-text-success has-text-weight-semibold'
                : 'has-text-grey-light'
            }`}
          >
            {truths}
            <span className="icon icon-right">
              <i className="far fa-thumbs-up"></i>
            </span>
          </p>
          <p
            className={`subtitle is-flex ${
              isGaslight
                ? 'has-text-danger has-text-weight-semibold'
                : 'has-text-grey-light'
            }`}
          >
            <span className="icon icon-left">
              <i className="far fa-meh-rolling-eyes"></i>
            </span>
            {gaslights}
          </p>
        </div>
        <p className="title is-4">{props.post.text}</p>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <button
            className={`button is-success is-fullwidth ${
              vote === true ? 'is-solid' : 'is-outlined'
            }`}
            onClick={() => props.onVote(props.post.id, true)}
          >
            <span className="icon">
              <i className="fas fa-thumbs-up"></i>
            </span>
            <span>Truth</span>
          </button>
        </p>
        <p className="card-footer-item">
          <button
            className={`button is-danger is-fullwidth ${
              vote === false ? 'is-solid' : 'is-outlined'
            }`}
            onClick={() => props.onVote(props.post.id, false)}
          >
            <span className="icon">
              <i className="fas fa-meh-rolling-eyes"></i>
            </span>
            <span>Gaslight</span>
          </button>
        </p>
      </footer>
    </div>
  );
};

export default Post;
