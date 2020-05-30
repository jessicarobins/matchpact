import React from 'react';
import * as firebase from 'firebase/app';
import Home from './pages/Home';

const App = () => {
  const [userId, setUserId] = React.useState('');

  React.useEffect(() => {
    firebase.auth().signInAnonymously().catch(console.log);
  }, []);

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!userId) {
    return null;
  }

  return <Home userId={userId} />;
};

export default App;
