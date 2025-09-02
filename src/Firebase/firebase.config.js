// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB519XN7DcAXtdx7KTgLembVRUp00JUp_Q",
  authDomain: "cup-cake-b05d6.firebaseapp.com",
  projectId: "cup-cake-b05d6",
  storageBucket: "cup-cake-b05d6.firebasestorage.app",
  messagingSenderId: "55688823873",
  appId: "1:55688823873:web:7eac43ddbf2a3c893632c0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);