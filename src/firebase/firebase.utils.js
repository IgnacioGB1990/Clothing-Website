import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const config = {

  apiKey: "AIzaSyC5YysmCfWMFZFse2_XP8hot7MXPjR816c",
  authDomain: "website-db-8878e.firebaseapp.com",
  databaseURL: "https://website-db-8878e.firebaseio.com",
  projectId: "website-db-8878e",
  storageBucket: "website-db-8878e.appspot.com",
  messagingSenderId: "706202500942",
  appId: "1:706202500942:web:ff560797f248c8d458281f",
  measurementId: "G-79DQ8SPXXJ"

};

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;