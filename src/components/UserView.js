// src/components/UserView.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/credenciales"; 
import { collection, getDocs } from "firebase/firestore";
import { Container, ListGroup } from 'react-bootstrap';

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
    <Container className="mt-4"> {/* Aplicar la clase Container */}
      <h1>User Dashboard</h1>
      <h2>Available Clothes</h2>
      <ListGroup>
        {clothes.map((item) => (
          <ListGroup.Item key={item.id}>
            {item.name} - ${item.price}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Available Accessories</h2>
      <ListGroup>
        {accessories.map((item) => (
          <ListGroup.Item key={item.id}>
            {item.name} - ${item.price}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default UserView;
