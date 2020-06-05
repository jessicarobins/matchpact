import React, { FC } from 'react';
import PostForm from '../../components/PostForm';
import PostList from '../../components/PostList';
import { usePosts } from '../../hooks/usePosts';
import './Home.scss';
import CollapsibleSection from '../../components/CollapsibleSection';

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
      <CollapsibleSection
        className="is-dark"
        postCount={groupedPosts.incomplete.length}
        subtitle="These users have not yet completed their maximum offer to match.
              Donate and send them screenshots!"
        title="Open Offers"
        titleClassName="has-text-light"
      >
        <PostList
          onComplete={postApi.completePost}
          onReport={postApi.reportPost}
          posts={groupedPosts.incomplete}
          userUid={props.userId}
        />
      </CollapsibleSection>
      <CollapsibleSection
        className="is-light"
        initialCollapsed
        postCount={groupedPosts.complete.length}
        subtitle="These users have already completed their maximum match. Check in
              with them often because some have stated they will continue to
              match donations on another day."
        title="Closed offers"
        titleClassName="has-text-dark"
      >
        <PostList
          onReport={postApi.reportPost}
          posts={groupedPosts.complete}
          userUid={props.userId}
        />
      </CollapsibleSection>
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
