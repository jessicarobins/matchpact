import React, { FC } from 'react';

const Loading: FC<{}> = () => (
  <section className="hero is-fullheight">
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="fa-5x">
          <i className="fars fa-donate fa-spin has-text-accent-light"></i>
        </div>
      </div>
    </div>
  </section>
);

export default Loading;
