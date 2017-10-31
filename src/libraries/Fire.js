import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBxahwUBrv0zBnGH5ni1E5ZI0MJuCezsvM",
  authDomain: "luxe-dev-88038.firebaseapp.com",
  databaseURL: "https://luxe-dev-88038.firebaseio.com/",
};

var fire = firebase.initializeApp(config);

export default fire;
