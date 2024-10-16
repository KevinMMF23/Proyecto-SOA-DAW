// src/firebase/credenciales.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCP4T-LZXCBwWh5dCgiQumpMhuO4hgjXUw",
  authDomain: "tienda-proyecto-soa-daw.firebaseapp.com",
  databaseURL: "https://tienda-proyecto-soa-daw-default-rtdb.firebaseio.com",
  projectId: "tienda-proyecto-soa-daw",
  storageBucket: "tienda-proyecto-soa-daw.appspot.com",
  messagingSenderId: "790423393318",
  appId: "1:790423393318:web:7ed22eb391abf129a382e7",
  measurementId: "G-XFCX9QFVQ9"
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Exporta Auth y Firestore
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Exporta firebaseApp como exportación por defecto
export default firebaseApp;

// También exporta auth y db
export { auth, db };
