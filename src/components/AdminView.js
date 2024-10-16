// src/components/AdminView.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/credenciales"; 
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import ClothesForm from "./ClothesForm";
import AccessoriesForm from "./AccessoriesForm";

function AdminView() {
  const [clothes, setClothes] = useState([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const fetchClothes = async () => {
      const clothesCollection = collection(db, "clothes");
      const clothesSnapshot = await getDocs(clothesCollection);
      const clothesList = clothesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setClothes(clothesList);
    };

    const fetchAccessories = async () => {
      const accessoriesCollection = collection(db, "accessories");
      const accessoriesSnapshot = await getDocs(accessoriesCollection);
      const accessoriesList = accessoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAccessories(accessoriesList);
    };

    fetchClothes();
    fetchAccessories();
  }, []);

  const handleDeleteClothing = async (id) => {
    await deleteDoc(doc(db, "clothes", id));
    setClothes(clothes.filter((item) => item.id !== id));
  };

  const handleDeleteAccessory = async (id) => {
    await deleteDoc(doc(db, "accessories", id));
    setAccessories(accessories.filter((item) => item.id !== id));
  };

  return (
    <div className="container mt-4"> {/* Aplicar la clase container */}
      <h1 className="text-center">Admin Dashboard</h1>
      <h2>Manage Clothes</h2>
      <ClothesForm />
      <ul className="list-group mb-4"> {/* Aplicar la clase list-group */}
        {clothes.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name} - ${item.price}
            <button className="btn btn-danger" onClick={() => handleDeleteClothing(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2>Manage Accessories</h2>
      <AccessoriesForm />
      <ul className="list-group">
        {accessories.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name} - ${item.price}
            <button className="btn btn-danger" onClick={() => handleDeleteAccessory(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminView;
