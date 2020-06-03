import React, { FC } from 'react';
import Post from '../Post';
import './PostList.css';

type Props = {
  onComplete?: (tweetId: string) => void;
  onReport: (tweetId: string) => void;
  posts: Post[];
  userUid: string;
};

const PostList: FC<Props> = (props: Props) => {
  return (
    <div className="columns is-multiline">
      {props.posts.map((post) => (
        <Post
          key={post.id}
          onComplete={props.onComplete}
          onReport={props.onReport}
          post={post}
          userUid={props.userUid}
        />
      ))}
    </div>
  );
};

export default PostList;
