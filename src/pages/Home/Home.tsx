import React, { FC } from 'react';
import * as api from '../../api';
import PostForm from '../../components/PostForm';
import PostList from '../../components/PostList';
import './Home.scss';

type Props = {
  userId: string;
};

const Home: FC<Props> = (props: Props) => {
  const [posts, setPosts] = React.useState([] as Post[]);

  React.useEffect(() => {
    async function getPosts() {
      const posts = await api.fetchPosts();
      setPosts(posts);
    }

    getPosts();
  }, []);

  const onAddPost = async (text: string) => {
    const post = await api.createPost(text);
    setPosts([post, ...posts]);
  };

  return (
    <div className="has-background-dark">
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <h1 className="title special-font is-1 has-text-dark">
              <span className="has-text-primary">match</span>pact
            </h1>
            <h2 className="subtitle is-3 has-text-accent-dark">
              Who is matching donations?
            </h2>
            <PostForm onAddPost={onAddPost} />
          </div>
        </div>
      </section>
      <section className="container post-list-container">
        <PostList onComplete={api.completePost} posts={posts} />
      </section>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>MATCHPACT</strong> by{' '}
            <a
              href="https://twitter.com/jessisdotcool"
              rel="noopener noreferrer"
              target="_blank"
            >
              @jessisdotcool
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
