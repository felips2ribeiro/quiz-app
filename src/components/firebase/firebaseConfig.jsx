import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc, where, query, doc, updateDoc } from 'firebase/firestore';

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
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs,getDoc, where, query, doc, updateDoc };

