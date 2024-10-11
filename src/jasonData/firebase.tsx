// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "table-tenis-data.firebaseapp.com",
  projectId: "table-tenis-data",
  storageBucket: "table-tenis-data.appspot.com",
  messagingSenderId: "695601692101",
  appId: "1:695601692101:web:c6388bbac35dfe7af51fac",
  measurementId: "G-VHXGG65JRK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
