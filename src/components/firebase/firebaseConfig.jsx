// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF-fZLfJCmolFNLtP4vQIiKJzfKc8UYP0",
  authDomain: "quiz-5db8a.firebaseapp.com",
  projectId: "quiz-5db8a",
  storageBucket: "quiz-5db8a.appspot.com",
  messagingSenderId: "992618416806",
  appId: "1:992618416806:web:3e555869437b3e8fc7c267",
  measurementId: "G-N41KV33WPW"
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);
const analytics = getAnalytics(db);

export default db