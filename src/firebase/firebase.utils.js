import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCe7kL_793VaB_YHAPDT9Z1J7spddCWcK8",
    authDomain: "crwn-db-80e08.firebaseapp.com",
    databaseURL: "https://crwn-db-80e08.firebaseio.com",
    projectId: "crwn-db-80e08",
    storageBucket: "",
    messagingSenderId: "181673811851",
    appId: "1:181673811851:web:7ded90c6b3a92e5c"
};

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

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
