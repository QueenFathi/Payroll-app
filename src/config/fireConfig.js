import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBawMx2MUVPICbGWGuJtzqYHfgAilioMrE",
  authDomain: "payroller-b6a47.firebaseapp.com",
  projectId: "payroller-b6a47",
  storageBucket: "payroller-b6a47.appspot.com",
  messagingSenderId: "755329311868",
  appId: "1:755329311868:web:b2ca978dc24378062795f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, auth, db };
