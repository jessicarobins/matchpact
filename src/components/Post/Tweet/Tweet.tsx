import React, { FC } from 'react';
import TweetEmbed from 'react-tweet-embed';
import './Tweet.css';

type Props = {
  tweetId: string;
  tweetUrl: string;
};

const Tweet: FC<Props> = (props: Props) => (
  <>
    <div className="card tweet">
      <a href={props.tweetUrl} rel="noopener noreferrer" target="_blank">
        View tweet
      </a>
    </div>
    <TweetEmbed id={props.tweetId} options={{ cards: 'hidden', width: 300 }} />
  </>
);

export default Tweet;
