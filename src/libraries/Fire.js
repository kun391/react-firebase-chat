import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyD7IEK2mKR4ERHemXAIVgzhP-DSNEgbJGQ",
  authDomain: "luxeios-ca1f4.firebaseapp.com",
  databaseURL: "https://luxeios-ca1f4.firebaseio.com/",
};

var fire = firebase.initializeApp(config);

export default fire;
