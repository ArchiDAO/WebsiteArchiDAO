// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbbgvth9u0l4zE390Ko1WAYd9Fs5gsjDQ",
  authDomain: "archidao.firebaseapp.com",
  projectId: "archidao",
  storageBucket: "archidao.appspot.com",
  messagingSenderId: "1064854491749",
  appId: "1:1064854491749:web:cf5efaebe7555167532c8c",
  measurementId: "G-4JFQ60YZP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}
