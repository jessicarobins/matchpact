import React, { FC } from 'react';

import './CollapsibleSection.css';

type Props = {
  children: React.ReactNode;
  className: string;
  initialCollapsed?: boolean;
  postCount: number;
  subtitle: string;
  title: string;
  titleClassName: string;
};

const CollapsibleSection: FC<Props> = (props: Props) => {
  const [collapsed, setCollapsed] = React.useState(
    props.initialCollapsed ?? false,
  );

  return (
    <section className={`hero ${props.className}`}>
      <div className="hero-body">
        <div className="container">
          <div className="title-container">
            <span className="icon">
              <i
                className={`fas fa-3x ${
                  collapsed ? 'fa-angle-right' : 'fa-angle-down'
                }`}
              ></i>
            </span>
            <div>
              <h3 className={`title special-font is-3 ${props.titleClassName}`}>
                {props.title} ({props.postCount})
              </h3>
              <h4 className="subtitle is-5 has-text-accent-dark">
                {props.subtitle}
              </h4>
              {collapsed && (
                <button
                  className="button is-text"
                  onClick={() => setCollapsed(false)}
                >
                  Show {props.postCount} offers
                </button>
              )}
            </div>
          </div>
          {!collapsed && props.children}
        </div>
      </div>
    </section>
  );
};

export default CollapsibleSection;
