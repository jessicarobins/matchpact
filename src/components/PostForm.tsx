import React, { FC } from 'react';

type Props = {
  onAddPost: (text: string) => void;
};

const PostForm: FC<Props> = (props: Props) => {
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState('');

  const handleChange = (e: React.BaseSyntheticEvent) => {
    setText(e.target.value);
    setError('');
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (text) {
      try {
        await props.onAddPost(text);
        setText('');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className={`input is-large ${!!error ? 'is-danger' : ''}`}
              onChange={handleChange}
              placeholder="Submit a new Twitter link"
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
        {!!error && <p className="help is-danger">{error}</p>}
      </div>
    </form>
  );
};

export default PostForm;
