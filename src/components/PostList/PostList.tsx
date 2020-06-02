import React, { FC } from 'react';
import Post from '../Post';
import './PostList.css';

type Props = {
  onComplete?: (postId: string) => void;
  posts: Post[];
};

const PostList: FC<Props> = (props: Props) => {
  return (
    <div className="columns is-multiline">
      {props.posts.map((post) => (
        <Post key={post.id} onComplete={props.onComplete} post={post} />
      ))}
    </div>
  );
};

export default PostList;
