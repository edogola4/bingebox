import { initializeApp } from 'firebase/app';

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
    apiKey: "AIzaSyAYH18xNhMQa8Tx4XqUajSqjEYHO2GV4IM",
    //apiKey: "AIzaSyALBzmAZo-2XHFCb3orQLzHhxWbeiQYetA",
    authDomain: "cinemaedge-759fb.firebaseapp.com",
    projectId: "cinemaedge-759fb",
    storageBucket: "cinemaedge-759fb.appspot.com",
    messagingSenderId: "170234766483",
    appId: "1:170234766483:web:114b9d3b46e994fcb5d966"
};

//initialize firebase
const firebaseApp = initializeApp(firebaseConfig);

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
    if(!userAuth) return;
    
    const userDocRef = doc(db, "users", userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);
    
    //if the usersnapshot doesn't exist in the firestore database
    if(!userSnapshot.exists()) {  
        const {displayName, email} = userAuth;
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
//     onAuthStateChanged(auth, callback);*/




/*// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs1KFOIZnTqXBRXdJrmjoTTPV-W86XvMU",
  authDomain: "bingebox-253b9.firebaseapp.com",
  projectId: "bingebox-253b9",
  storageBucket: "bingebox-253b9.firebasestorage.app",
  messagingSenderId: "180720640409",
  appId: "1:180720640409:web:86a07306638c3f4e5bb308",
  measurementId: "G-MH9PPFPV46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



/*
// Import Firebase functions
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    //collection,
    getDoc,
    setDoc,
} from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAs1KFOIZnTqXBRXdJrmjoTTPV-W86XvMU",
    authDomain: "bingebox-253b9.firebaseapp.com",
    projectId: "bingebox-253b9",
    storageBucket: "bingebox-253b9.appspot.com",
    messagingSenderId: "180720640409",
    appId: "1:180720640409:web:86a07306638c3f4e5bb308",
    measurementId: "G-MH9PPFPV46"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Setup Google provider for authentication
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

// Exported Auth and Firestore instances
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Google sign-in methods
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Create or update user document in Firestore
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            });
        } catch (error) {
            console.error('Error creating user document:', error.message);
        }
    }

    return userDocRef;
};

// Email/password user creation
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

// Email/password sign-in
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out user
export const signOutUser = async () => await signOut(auth);

// Listen for auth state changes
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

*/