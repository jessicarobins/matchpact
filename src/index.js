import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

import App from './App';
import { firebaseConfig } from './config/firebase';
import * as serviceWorker from './serviceWorker';
import './index.scss';

firebase.initializeApp(firebaseConfig);

if (!process.env.NODE_ENV === 'development') {
  firebase.analytics();
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
