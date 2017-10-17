import firebase from 'firebase'

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  databaseURL: "https://luxe-dev-88038.firebaseio.com/",
};

var fire = firebase.initializeApp(config);

export default fire;
