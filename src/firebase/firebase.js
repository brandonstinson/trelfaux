import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: `AIzaSyD8knJnK6GbyKN4mL1HU2Ew4YBGcjJf_Ls`,
  authDomain: `trelfaux.firebaseapp.com`,
  databaseURL: `https://trelfaux.firebaseio.com`,
  projectId: `trelfaux`,
  storageBucket: `trelfaux.appspot.com`,
  messagingSenderId: `689023386419`,
};

/* eslint-disable */
let db;
let auth;
/* eslint-enable */

if (typeof window !== `undefined`) {
  firebase.initializeApp(config);
  db = firebase.firestore();
  auth = firebase.auth();
}

export default firebase;

export { db, auth };
