import firebase from 'firebase/app';
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDacwJKeZuvH--rWRtXwvMb-d3fFOsgyOY",
  authDomain: "go-library-bb1d7.firebaseapp.com",
  projectId: "go-library-bb1d7",
  storageBucket: "go-library-bb1d7.appspot.com",
  messagingSenderId: "681870945447",
  appId: "1:681870945447:web:99f575fc23f85304c53f82",
  measurementId: "G-EFQXY1J3XZ"
};

firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()

export { firebase, googleAuthProvider, facebookAuthProvider };
