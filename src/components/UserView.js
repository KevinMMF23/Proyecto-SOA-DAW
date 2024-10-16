// src/components/UserView.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/credenciales"; 
import { collection, getDocs } from "firebase/firestore";

function UserView() {
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

  return (
    <div>
      <h1>User Dashboard</h1>
      <h2>Available Clothes</h2>
      <ul>
        {clothes.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <h2>Available Accessories</h2>
      <ul>
        {accessories.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserView;
