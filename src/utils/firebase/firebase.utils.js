import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

import {
    getFirestore,
    doc,
    collection,
    getDoc,
    setDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDC9qxRtHidn3HpWu3NZN9mXMGkwjyd1aE",
    authDomain: "bingebox-9e30c.firebaseapp.com",
    projectId: "bingebox-9e30c",
    storageBucket: "bingebox-9e30c.firebasestorage.app",
    messagingSenderId: "421197086912",
    appId: "1:421197086912:web:d3231839e9f3a7a6cd2d25",
    measurementId: "G-GSF74CD5GH"
};

//initialize firebase
const firebaseApp = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();

//google parameter for authentication
googleProvider.setCustomParameters({
    prompt: "select_account"
});

//sign in methods
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

//async function that receives user database
export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInfo = {}
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //if the usersnapshot doesn't exist in the firestore database
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            // create user document
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });

            // create profiles subcollection
            const profilesCollectionRef = collection(db, `users/${userAuth.uid}/profiles`);
            const profileDocRef = doc(profilesCollectionRef);
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
};

// export const signOutUser = async () => await signOut(auth);

// export const onAuthStateChangedListener = (callback) =>
//     onAuthStateChanged(auth, callback);