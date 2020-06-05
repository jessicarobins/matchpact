import React, { FC } from 'react';
import { TwitterShareButton } from 'react-twitter-embed';

import './TweetTemplate.css';

type Props = {
  onClose: () => void;
};

const TweetTemplate: FC<Props> = (props: Props) => {
  const tweet =
    "I just added you to this list of people and companies matching donations for visibility! Feel free to mark it as complete when you've hit your donation max.";

  return (
    <div className="notification tweet-template is-warning is-light">
      <button
        className="delete"
        aria-label="delete"
        onClick={props.onClose}
        type="button"
      ></button>
      <p className="cta">
        Thanks for adding a link! Send them a message to let them know and
        spread the word
      </p>
      <TwitterShareButton
        url="https://matchpact.com"
        options={{
          dnt: true,
          size: 'large',
          related: 'jessisdotcool',
          text: tweet,
        }}
      />
    </div>
  );
};

export default TweetTemplate;
