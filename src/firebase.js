// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkaf1F4aXR3mEMDj4zjMLBcw7H2f3Zuyc",
  authDomain: "scopieproject.firebaseapp.com",
  projectId: "scopieproject",
  storageBucket: "scopieproject.appspot.com",
  messagingSenderId: "772954773026",
  appId: "1:772954773026:web:cb20109d87cfd7d1cd1c7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
