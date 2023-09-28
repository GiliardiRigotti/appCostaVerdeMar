// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB4_JsJVtDsqRj66G1cSYJ6PyzhC2AllpI",
    authDomain: "appelevador-d1bdb.firebaseapp.com",
    projectId: "appelevador-d1bdb",
    storageBucket: "appelevador-d1bdb.appspot.com",
    messagingSenderId: "864497456796",
    appId: "1:864497456796:web:b05a99fae0b6d14eec3f59",
    measurementId: "G-R6CMTTT8PH"
};

const app = initializeApp(firebaseConfig);

const database = getFirestore();
const storage = getStorage(app);
export { database, storage }