// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNdcvVrlfpsADMaZnw-p_iu2pfckVWUKs",
  authDomain: "conjugiz-ee1ea.firebaseapp.com",
  projectId: "conjugiz-ee1ea",
  storageBucket: "conjugiz-ee1ea.appspot.com",
  messagingSenderId: "229066870204",
  appId: "1:229066870204:web:de17c7529bbbaba14b6fb9",
  measurementId: "G-7X5B84RFC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);