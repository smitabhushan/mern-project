// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-45cde.firebaseapp.com",
  projectId: "real-estate-45cde",
  storageBucket: "real-estate-45cde.appspot.com",
  messagingSenderId: "597214487739",
  appId: "1:597214487739:web:52b98d3687fef14c00759e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);