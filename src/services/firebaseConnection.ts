import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDH7p54LJKQXs29dK4QLmtCCJacjWO6fDk",
  authDomain: "yournotes-2f442.firebaseapp.com",
  projectId: "yournotes-2f442",
  storageBucket: "yournotes-2f442.firebasestorage.app",
  messagingSenderId: "803962406853",
  appId: "1:803962406853:web:96861db1eefe373c61edac"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }