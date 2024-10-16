import React, { useState } from 'react';
import { firebaseApp } from '../firebase/credenciales';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const ClothesForm = ({ existingClothing }) => {
  const [name, setName] = useState(existingClothing ? existingClothing.name : '');
  const [price, setPrice] = useState(existingClothing ? existingClothing.price : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingClothing) {
      // Actualizar la ropa existente
      const clothingDoc = doc(firebaseApp, 'clothes', existingClothing.id);
      await updateDoc(clothingDoc, { name, price: parseFloat(price) });
    } else {
      // Agregar nueva ropa
      await addDoc(collection(firebaseApp, 'clothes'), { name, price: parseFloat(price) });
    }
    // Limpiar el formulario
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
