import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_FIREBASE,
  databaseURL: process.env.REACT_APP_DATABASE_URL_FIREBASE,
  projectId: process.env.REACT_APP_PROJECT_ID_FIREBASE,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE,
  appId: process.env.REACT_APP_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dataBase = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, dataBase, auth, storage };
