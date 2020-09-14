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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error.message)
    }
  }
  return userRef;
}



firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;