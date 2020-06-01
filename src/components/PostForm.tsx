import React, { FC } from 'react';

type Props = {
  onAddPost: (text: string) => void;
};

const PostForm: FC<Props> = (props: Props) => {
  const [text, setText] = React.useState('');

  const handleChange = (e: React.BaseSyntheticEvent) => setText(e.target.value);

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (text) {
      props.onAddPost(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input is-large"
            onChange={handleChange}
            placeholder="Twitter link"
            type="text"
            value={text}
          />
        </div>
        <div className="control">
          <button className="button is-info is-large" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
