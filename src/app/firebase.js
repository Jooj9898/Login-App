//adding firebase authentication to the app, as per firebase documentation

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG-rfeFdA5Vocas4FMvtf_yBmPCVYSdfg",
  authDomain: "login-app-12734.firebaseapp.com",
  projectId: "login-app-12734",
  storageBucket: "login-app-12734.firebasestorage.app",
  messagingSenderId: "388347789514",
  appId: "1:388347789514:web:6db3adb86e8f2a07b63433",
  measurementId: "G-MJV86BJQP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;
export const db=getFirestore(app);