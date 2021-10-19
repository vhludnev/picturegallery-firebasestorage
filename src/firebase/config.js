import firebase from 'firebase/compat/app';		// v9
import 'firebase/compat/storage';							// v9
import 'firebase/compat/firestore'; 					// v9
import 'firebase/compat/auth';								// V9										
//import "firebase/auth"											// V6
//import * as firebase from 'firebase/app'; 	// v6
//import 'firebase/storage';									// v6
//import 'firebase/firestore';								// v6

// Firebase configuration
const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
});

const projectStorage = app.storage();
const projectFirestore = app.firestore();
const auth = app.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp, auth };