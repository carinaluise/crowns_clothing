import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyAkR_SE_ZlDLmYBjMqfACAWIcJEgZnFswg",
        authDomain: "crown-clothing-3f2af.firebaseapp.com",
        databaseURL: "https://crown-clothing-3f2af.firebaseio.com",
        projectId: "crown-clothing-3f2af",
        storageBucket: "crown-clothing-3f2af.appspot.com",
        messagingSenderId: "822324814438",
        appId: "1:822324814438:web:0721707835efa07e33c3a7",
        measurementId: "G-TYW6JJ6R09"
      };

      firebase.initializeApp(config);      

      export const createUserProfile = async (userAuth, additionalData ) => {

        if(!userAuth) return;
        
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        
        const snapShot = await userRef.get();
        
        console.log(snapShot);
        
        if(!snapShot.exists){

          const {displayName, email} = userAuth;
          const createdAt = new Date();

          try {
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData 
            })
          } catch (error){
            console.log('error creating user' ,  error.message)
          }
        }

      return userRef;

      }

    export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

      const collectionRef = firestore.collection(collectionKey);
    
      const batch = firestore.batch();
    
      objectsToAdd.forEach(obj => {
    
      const newDocRef = collectionRef.doc()
    
      batch.set(newDocRef, obj);
    
    });

    return await batch.commit();
}
  
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;



