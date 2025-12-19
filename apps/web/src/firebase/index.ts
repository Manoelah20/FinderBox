import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvPQshcWjQD9sHkQT-_0G-H6gKXRmxB80",
  authDomain: "finderbox-60d01.firebaseapp.com",
  projectId: "finderbox-60d01",
  storageBucket: "finderbox-60d01.firebasestorage.app",
  messagingSenderId: "688047009944",
  appId: "1:688047009944:web:1fd2974c8fadb7feffa0ed",
  measurementId: "G-LZQSCL3F56"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
