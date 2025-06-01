// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB81jMXJRqQV6ypvoaTnorXHwh8ahW7YkQ",
  authDomain: "capstone-project-18acc.firebaseapp.com",
  projectId: "capstone-project-18acc",
  storageBucket: "capstone-project-18acc.firebasestorage.app",
  messagingSenderId: "579783428224",
  appId: "1:579783428224:web:b546fd1cb4d3fe3be2be65",
  measurementId: "G-Q524BQ9FNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize analytics only in browser environment
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;