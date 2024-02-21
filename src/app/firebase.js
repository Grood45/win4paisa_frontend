
import { getAuth } from "firebase/auth"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCfKuyjDjeGur5NVFMsyf8lYigXzxZgac",
  authDomain: "authentication-ae85a.firebaseapp.com",
  projectId: "authentication-ae85a",
  storageBucket: "authentication-ae85a.appspot.com",
  messagingSenderId: "154782194943",
  appId: "1:154782194943:web:f8c5215a4fbd772fdd00ca",
  measurementId: "G-03N8H8TBD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth =getAuth()