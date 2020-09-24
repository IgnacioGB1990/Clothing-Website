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
  const collectionRef = firestore.collection("users")

  const snapShot = await userRef.get();
  const collectionSnapshot = await collectionRef.get();
  console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) })

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd) => {

  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef)

  //En caso de que falle comunicación creamos un seguro para que se rompa
  const batch = firestore.batch()
  //Usamos forEach() en vez de map() porque no nos devuelve un nuevo array
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(obj.title);
    batch.set(newDocRef, obj)
    console.log("this is the newdocref", newDocRef);

  })

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
  console.log(transformedCollection)
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;