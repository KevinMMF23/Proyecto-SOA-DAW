// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap
import "./styles/global.css"; // Importar estilos globales
import { CartProvider } from './context/CartContext'; // Importar CartProvider

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
