import React, { FC } from 'react';
import InstagramEmbed from 'react-instagram-embed';
import './Instagram.css';

type Props = {
  igId: string;
  igUrl: string;
};

const igPost: FC<Props> = (props: Props) => (
  <>
    <div className="card ig">
      <a href={props.igUrl} rel="noopener noreferrer" target="_blank">
        View on Instagram
      </a>
    </div>
    <InstagramEmbed
      url={props.igUrl}
      // igId={props.igId}
      // options={{ cards: 'hidden', width: 300 }}
    />
  </>
);

export default igPost;
