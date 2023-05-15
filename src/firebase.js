import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, doc, getDoc, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQoeqF6PbRw08suqgjLzU5wzeazUkSuzM",
  authDomain: "projekt-pi-42940.firebaseapp.com",
  projectId: "projekt-pi-42940",
  storageBucket: "projekt-pi-42940.appspot.com",
  messagingSenderId: "345759194598",
  appId: "1:345759194598:web:adfea4a14f7f1333db0a27"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();

export {
   app,
   auth,
   db,
   collection, query, where, getDocs,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signOut,
   doc,
   getDoc,
   createUserWithEmailAndPassword,
   updateProfile,
   addDoc
}