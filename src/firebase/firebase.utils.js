import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCe7kL_793VaB_YHAPDT9Z1J7spddCWcK8",
    authDomain: "crwn-db-80e08.firebaseapp.com",
    databaseURL: "https://crwn-db-80e08.firebaseio.com",
    projectId: "crwn-db-80e08",
    storageBucket: "crwn-db-80e08.appsport.com",
    messagingSenderId: "181673811851",
    appId: "1:181673811851:web:7ded90c6b3a92e5c"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);    

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('Error creating user', error.message);
        }
    }

    /* Create user in Firebase when not exists and return it
        or just return it when exists */
    return userRef;

};

/* To add shop.data.js to firebase as initial value, call it from App.js */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();//Batch update (all or nothing)
    objectsToAdd.forEach(obj  => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    
    return await batch.commit();

};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return{
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title, 
            items
        }
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
