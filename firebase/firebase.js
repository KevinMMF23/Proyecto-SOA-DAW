// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP4T-LZXCBwWh5dCgiQumpMhuO4hgjXUw",
  authDomain: "tienda-proyecto-soa-daw.firebaseapp.com",
  projectId: "tienda-proyecto-soa-daw",
  storageBucket: "tienda-proyecto-soa-daw.appspot.com",
  messagingSenderId: "790423393318",
  appId: "1:790423393318:web:7ed22eb391abf129a382e7",
  measurementId: "G-XFCX9QFVQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
