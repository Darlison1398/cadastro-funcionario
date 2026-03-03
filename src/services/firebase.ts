// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3SYXc-Gj7vpGz5cashOULwM2l92MQ5JM",
  authDomain: "cadastro-funcionario-6a32d.firebaseapp.com",
  projectId: "cadastro-funcionario-6a32d",
  storageBucket: "cadastro-funcionario-6a32d.firebasestorage.app",
  messagingSenderId: "238698089529",
  appId: "1:238698089529:web:9ac5d7ad63b1304ebf11e8",
  measurementId: "G-L534808YHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);