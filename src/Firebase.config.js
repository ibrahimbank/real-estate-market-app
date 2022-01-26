// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiKHKr_yHb1ioS8_MZ0DLdo0Bbzqz6NuQ",
  authDomain: "real-estate-app-28938.firebaseapp.com",
  projectId: "real-estate-app-28938",
  storageBucket: "real-estate-app-28938.appspot.com",
  messagingSenderId: "744775537593",
  appId: "1:744775537593:web:aa723c7a8f7c48956f5c68",
  measurementId: "G-CQZLHRT5LM",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();
