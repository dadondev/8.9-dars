import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAhlzIKvNMN-zTa_5QGbLiRz5z5PeWA26E",
  authDomain: "fn12-d5f6b.firebaseapp.com",
  projectId: "fn12-d5f6b",
  storageBucket: "fn12-d5f6b.appspot.com",
  messagingSenderId: "680367164527",
  appId: "1:680367164527:web:5d28ad34b2968816ce119a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
