// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDcxmGac6hEhF-lWe4UDTtmoSN6HLU4xIQ",
    authDomain: "recipe-app-bf051.firebaseapp.com",
    projectId: "recipe-app-bf051",
    storageBucket: "recipe-app-bf051.appspot.com",
    messagingSenderId: "937198854137",
    appId: "1:937198854137:web:8164e77da377f73468a728",
    measurementId: "G-DR5W9JZHND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;