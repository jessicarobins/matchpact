import React, { FC } from 'react';
import firebase from 'firebase/app';
import TweetTemplate from './TweetTemplate';

type Props = {
  onAddPost: (text: string) => void;
};

const PostForm: FC<Props> = (props: Props) => {
  const [showTemplateTweet, setShowTemplateTweet] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState('');

  const recaptchaRef = React.useRef({}) as any;

  React.useEffect(() => {
    recaptchaRef.current.verifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha',
      {
        size: 'invisible',
      },
    );
  }, [recaptchaRef]);

  const handleChange = (e: React.BaseSyntheticEvent) => {
    setText(e.target.value);
    setError('');
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (!submitting) {
      setSubmitting(true);
      try {
        const response = await recaptchaRef.current.verifier.verify();
        if (response) {
          await props.onAddPost(text);
          setShowTemplateTweet(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setText('');
        setSubmitting(false);
      }
    }
  };

  return (
    <>
      {showTemplateTweet && (
        <TweetTemplate onClose={() => setShowTemplateTweet(false)} />
      )}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className={`input is-large ${!!error ? 'is-danger' : ''}`}
                onChange={handleChange}
                placeholder="Submit a new link"
                type="text"
                value={text}
              />
            </div>
            <div className="control">
              <button
                className="button is-info is-large"
                disabled={submitting}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
          {!!error && <p className="help is-danger">{error}</p>}
        </div>
        <div id="recaptcha"></div>
      </form>
    </>
  );
};

export default PostForm;
