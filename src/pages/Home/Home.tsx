import React, { FC } from 'react';
import PostForm from '../../components/PostForm';
import PostList from '../../components/PostList';
import { usePosts } from '../../hooks/usePosts';
import './Home.scss';

type Props = {
  userId: string;
};

const Home: FC<Props> = (props: Props) => {
  const [groupedPosts, postApi] = usePosts();

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
            <PostForm onAddPost={postApi.addPost} />
          </div>
        </div>
      </section>
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h3 className="title special-font is-3 has-text-light">
              Open offers
            </h3>
            <h4 className="subtitle is-5 has-text-accent-dark">
              These users have not yet completed their maximum offer to match.
              Donate and send them screenshots!
            </h4>
            <PostList
              onComplete={postApi.completePost}
              onReport={postApi.reportPost}
              posts={groupedPosts.incomplete}
              userUid={props.userId}
            />
          </div>
        </div>
      </section>
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <h3 className="title special-font is-3 has-text-dark">
              Closed offers
            </h3>
            <h4 className="subtitle is-5 has-text-accent-dark">
              These users have already completed their maximum match. Check in
              with them often because some have stated they will continue to
              match donations on another day.
            </h4>
            <PostList
              onReport={postApi.reportPost}
              posts={groupedPosts.complete}
              userUid={props.userId}
            />
          </div>
        </div>
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
