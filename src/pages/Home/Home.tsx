import React, { FC } from 'react';
import * as api from '../../api';
import PostForm from '../../components/PostForm';
import PostList from '../../components/PostList';
import './Home.css';

type Props = {
  userId: string;
};

const Home: FC<Props> = (props: Props) => {
  const [posts, setPosts] = React.useState([] as Post[]);
  const [votes, setVotes] = React.useState({} as VoteMap);

  React.useEffect(() => {
    async function getPosts() {
      const [posts, votes] = await Promise.all([
        api.fetchPosts(),
        api.fetchVotes(),
      ]);
      setPosts(posts);
      setVotes(votes);
    }

    getPosts();
  }, []);

  const onAddPost = async (text: string) => {
    const post = await api.createPost(text);
    setPosts([post, ...posts]);
  };

  const onVote = async (postId: string, vote: boolean) => {
    api.setVote(postId, vote);
    setVotes({ ...votes, [postId]: { id: postId, truth: vote } });
    setPosts((prevValue) =>
      prevValue.map((post) => {
        if (post.id === postId) {
          return { ...post, votes: { ...post.votes, [props.userId]: vote } };
        }

        return post;
      }),
    );
  };

  return (
    <>
      <section className="hero is-light is-medium">
        <div className="hero-body">
          <div className="container">
            <h1 className="title special-font is-1">He said...</h1>
            <PostForm onAddPost={onAddPost} />
          </div>
        </div>
      </section>
      <section className="container post-list-container">
        <PostList onVote={onVote} posts={posts} votes={votes} />
      </section>
    </>
  );
};

export default Home;
