// src/components/AccessoriesForm.js
import React, { useState } from 'react';
import { firebaseApp } from '../firebase/credenciales';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const AccessoriesForm = ({ existingAccessory }) => {
  const [name, setName] = useState(existingAccessory ? existingAccessory.name : '');
  const [price, setPrice] = useState(existingAccessory ? existingAccessory.price : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingAccessory) {
      // Actualizar el accesorio existente
      const accessoryDoc = doc(firebaseApp, 'accessories', existingAccessory.id);
      await updateDoc(accessoryDoc, { name, price: parseFloat(price) });
    } else {
      // Agregar nuevo accesorio
      await addDoc(collection(firebaseApp, 'accessories'), { name, price: parseFloat(price) });
    }
    // Limpiar el formulario
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
