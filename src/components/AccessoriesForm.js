// src/components/AccessoriesForm.js
import React, { useState } from 'react';
import { db } from '../firebase/credenciales';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const AccessoriesForm = ({ existingAccessory }) => {
  const [name, setName] = useState(existingAccessory ? existingAccessory.name : '');
  const [price, setPrice] = useState(existingAccessory ? existingAccessory.price : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingAccessory) {
      // Actualiza el accesorio existente
      const accessoryDoc = doc(db, 'accessories', existingAccessory.id);
      await updateDoc(accessoryDoc, { name, price: parseFloat(price) });
    } else {
      // Agrega nuevo accesorio
      await addDoc(collection(db, 'accessories'), { name, price: parseFloat(price) });
    }
    // Limpia el formulario
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Accessory Name"
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
      <button type="submit">{existingAccessory ? 'Update Accessory' : 'Add Accessory'}</button>
    </form>
  );
};

export default AccessoriesForm;
