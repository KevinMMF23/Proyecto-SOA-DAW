import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseApp;