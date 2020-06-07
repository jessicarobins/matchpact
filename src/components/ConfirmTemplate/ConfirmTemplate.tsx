import React, { FC } from 'react';

import './ConfirmTemplate.css';

type Props = {
  onClose: () => void;
};

const ConfirmTemplate: FC<Props> = (props: Props) => {
  return (
    <div className="notification confirm-template is-warning is-light">
      <button
        className="delete"
        aria-label="delete"
        onClick={props.onClose}
        type="button"
      ></button>
      <p className="cta">
        Thanks for adding a link! Please help spread the word!
      </p>
    </div>
  );
};

export default ConfirmTemplate;
