import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlj2agU_hKJxGh6_MAHCjZqsUf6x28aeU",
  authDomain: "my-zone-1103.firebaseapp.com",
  projectId: "my-zone-1103",
  storageBucket: "my-zone-1103.appspot.com",
  messagingSenderId: "732930496827",
  appId: "1:732930496827:web:57fa9b6574f95b0d38bf1e",
  measurementId: "G-8BVC285Z9W",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

auth.createUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(auth, email, password);
auth.signInWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);

export { auth, db };
