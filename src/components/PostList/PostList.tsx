import React, { FC } from 'react';
import Post from '../Post';
import './PostList.css';

type Props = {
  onVote: (postId: string, vote: boolean) => void;
  posts: Post[];
  votes: VoteMap;
};

const PostList: FC<Props> = (props: Props) => {
  return (
    <div className="tile columns is-multiline is-ancestor">
      {props.posts.map((post) => (
        <div
          className="tile column is-one-quarter-widescreen is-one-third-desktop is-parent"
          key={post.id}
        >
          <div className="tile is-child">
            <Post
              onVote={props.onVote}
              post={post}
              vote={props.votes[post.id]}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
