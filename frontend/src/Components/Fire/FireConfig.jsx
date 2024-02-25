import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7t6R70zMdalfU6XjM_EvhZ1zStLqO8HA",
  authDomain: "filmtrailers-e2720.firebaseapp.com",
  projectId: "filmtrailers-e2720",
  storageBucket: "filmtrailers-e2720.appspot.com",
  messagingSenderId: "366285200937",
  appId: "1:366285200937:web:8c20133da60f1083a0c638",
  measurementId: "G-DMWSYSFRQJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const gitHubAuth = new GithubAuthProvider(app);