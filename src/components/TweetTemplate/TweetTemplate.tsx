import React, { FC } from 'react';

import './TweetTemplate.css';

type Props = {
  onClose: () => void;
  tweetId: string;
};

const TweetTemplate: FC<Props> = (props: Props) => {
  const tweet =
    "I just added you to this list of people and companies matching donations for visibility! Feel free to mark it as complete when you've hit your donation max.";

  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweet}&url=https://www.matchpact.com&related=jessisdotcool&in_reply_to=${props.tweetId}`;

  return (
    <div className="notification tweet-template is-warning is-light">
      <button
        className="delete"
        aria-label="delete"
        onClick={props.onClose}
        type="button"
      ></button>
      <p className="cta">
        Thanks for adding a link! Let them know and spread the word
        <a className="button is-link is-rounded" href={tweetUrl}>
          <span className="icon">
            <i className="fab fa-twitter"></i>
          </span>
          <span>Tweet</span>
        </a>
      </p>
    </div>
  );
};

export default TweetTemplate;
