// src/components/ClothesForm.js
import React, { useState } from 'react';
import { db } from '../firebase/credenciales';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const ClothesForm = ({ existingClothing }) => {
  const [name, setName] = useState(existingClothing ? existingClothing.name : '');
  const [price, setPrice] = useState(existingClothing ? existingClothing.price : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingClothing) {
      // Actualiza la ropa existente
      const clothingDoc = doc(db, 'clothes', existingClothing.id);
      await updateDoc(clothingDoc, { name, price: parseFloat(price) });
    } else {
      // Agrega nueva ropa
      await addDoc(collection(db, 'clothes'), { name, price: parseFloat(price) });
    }
    // Limpia el formulario
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Clothing Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">{existingClothing ? 'Update Clothing' : 'Add Clothing'}</button>
    </form>
  );
};

export default ClothesForm;
