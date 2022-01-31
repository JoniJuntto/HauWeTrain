
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { getFirestore } from "@firebase/firestore";
import { getAuth, onAuthStateChanged} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBykrli5oy0rTN5aGNd8VGzqMIBqnd75M",
  authDomain: "hauwetrain.firebaseapp.com",
  projectId: "hauwetrain",
  storageBucket: "hauwetrain.appspot.com",
  messagingSenderId: "554012726806",
  appId: "1:554012726806:web:f624584e56dd19a9f5c737"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {auth, db}

export function useAuth() {
    const [currentUser, setCurrenUser] = useState();
    useEffect(()=> {
      const unsub = onAuthStateChanged(auth, user => setCurrenUser(user));
      return unsub
    }, [])
  
    return currentUser;
  }