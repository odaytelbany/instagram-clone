import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLqsDGc4w9EH1UxDhjrjKvZ5WSNXeDhw4",
  authDomain: "instagram-clone-d3ccd.firebaseapp.com",
  projectId: "instagram-clone-d3ccd",
  storageBucket: "instagram-clone-d3ccd.appspot.com",
  messagingSenderId: "503336834748",
  appId: "1:503336834748:web:73c0764954d25d2649e2b9"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage }