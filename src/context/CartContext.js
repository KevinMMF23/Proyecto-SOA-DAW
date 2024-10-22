// src/context/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setMessage(`Producto ${product.name} agregado al carrito!`);
    
    // Limpiar el mensaje después de 3 segundos
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, message }}>
      {children}
    </CartContext.Provider>
  );
};
