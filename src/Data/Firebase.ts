// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGinlAJk59kegTduMK668PGKU7sFlrFCo",
  authDomain: "conjugon-99bcb.firebaseapp.com",
  projectId: "conjugon-99bcb",
  storageBucket: "conjugon-99bcb.appspot.com",
  messagingSenderId: "256087730815",
  appId: "1:256087730815:web:b4a89d8892366161fe2d4a",
  measurementId: "G-RS5GG9MGJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);