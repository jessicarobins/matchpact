import React from 'react';
import * as firebase from 'firebase/app';
import Home from './pages/Home';
import Loading from './pages/Loading';

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
    return <Loading />;
  }

  return <Home userId={userId} />;
};

export default App;
