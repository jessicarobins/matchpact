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
      <div className="field">
        <div className="control">
          <textarea
            className="textarea is-primary is-large"
            value={text}
            onChange={handleChange}
            maxLength={500}
            placeholder="What did they tell you was normal?"
          ></textarea>
        </div>
      </div>
      <div className="buttons is-centered">
        <button className="button is-large is-dark" type="submit">
          Is it true?
        </button>
      </div>
    </form>
  );
};

export default PostForm;
