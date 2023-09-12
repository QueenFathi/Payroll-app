import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
    apiKey: "AIzaSyDwP9NAH6-8qySyNoSiwGniOiiVOvjq1YE",
    authDomain: "payroll-477f.firebaseapp.com",
    projectId: "payroll-477f",
    storageBucket: "payroll-477f.appspot.com",
    messagingSenderId: "679167396327",
    appId: "1:679167396327:web:9244ee4f027d34fef61542",
    measurementId: "G-DX37K5WGZ5"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);