import React, { useEffect, useState } from "react";
import { firebaseApp } from "../firebase/credenciales";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import ClothesForm from "./ClothesForm"; // Asegúrate de que el nombre sea correcto
import AccessoriesForm from "./AccessoriesForm"; // Asegúrate de que el nombre sea correcto

function AdminView() {
  const [clothes, setClothes] = useState([]);
  const [accessories, setAccessories] = useState([]);

  // Cargar datos de ropa y accesorios
  useEffect(() => {
    const fetchClothes = async () => {
      const clothesCollection = collection(firebaseApp, "clothes");
      const clothesSnapshot = await getDocs(clothesCollection);
      const clothesList = clothesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setClothes(clothesList);
    };

    const fetchAccessories = async () => {
      const accessoriesCollection = collection(firebaseApp, "accessories");
      const accessoriesSnapshot = await getDocs(accessoriesCollection);
      const accessoriesList = accessoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAccessories(accessoriesList);
    };

    fetchClothes();
    fetchAccessories();
  }, []);

  const handleDeleteClothing = async (id) => {
    await deleteDoc(doc(firebaseApp, "clothes", id));
    setClothes(clothes.filter((item) => item.id !== id));
  };

  const handleDeleteAccessory = async (id) => {
    await deleteDoc(doc(firebaseApp, "accessories", id));
    setAccessories(accessories.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Manage Clothes</h2>
      <ClothesForm />
      <ul>
        {clothes.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
            <button onClick={() => handleDeleteClothing(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Manage Accessories</h2>
      <AccessoriesForm />
      <ul>
        {accessories.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
            <button onClick={() => handleDeleteAccessory(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminView;
