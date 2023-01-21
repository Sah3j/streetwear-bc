import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDb7zqaGMTRU9Udm0SPUinY8ARxe1AIgVU",
  authDomain: "streetwear-bc.firebaseapp.com",
  projectId: "streetwear-bc",
  storageBucket: "streetwear-bc.appspot.com",
  messagingSenderId: "297009884865",
  appId: "1:297009884865:web:987e17d8588f8a450d2e40",
  measurementId: "G-PM3WLE3TY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);