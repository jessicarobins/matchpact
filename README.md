This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Initial Setup

This project uses [Firebase](https://firebase.google.com/) as the web host and backend. To run this repo locally, you will need to set up your own firebase project and add the corresponding environment variables.

### Setup

- Follow [the steps listed here](https://firebase.google.com/docs/web/setup#using-module-bundlers) to create a new Firebase project using module bundlers.
- You will want to set up the following Firebase services:
  - Hosting
  - Authentication (Anonymous)
  - Database

### Environment variables

The following variables are necessary and correspond to the similarly-named key in the firebase config object for your project. You can get the values by [following these steps](https://support.google.com/firebase/answer/7015592)

- `REACT_APP_MATCHPACT_FIREBASE_API_KEY`
- `REACT_APP_MATCHPACT_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_MATCHPACT_FIREBASE_DATABASE_URL`
- `REACT_APP_MATCHPACT_FIREBASE_PROJECT_ID`
- `REACT_APP_MATCHPACT_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_MATCHPACT_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_MATCHPACT_FIREBASE_APP_ID`
- `REACT_APP_MATCHPACT_FIREBASE_MEASUREMENT_ID`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
