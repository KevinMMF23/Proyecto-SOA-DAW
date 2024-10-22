import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase/credenciales";
import { collection, getDocs } from "firebase/firestore";
import { Container, ListGroup, Button, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function UserView() {
  const [clothes, setClothes] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const { addToCart, message } = useContext(CartContext);
  const navigate = useNavigate(); // Usar useNavigate

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

  // Maneja la adición al carrito y la redirección
  const handleAddToCart = (item) => {
    addToCart(item);
    navigate('/cart'); // Redirige a la página del carrito
  };

  return (
    <Container className="mt-4">
      <h1>User Dashboard</h1>
      {message && <Alert variant="success">{message}</Alert>}
      <h2>Available Clothes</h2>
      <ListGroup>
        {clothes.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
            {item.name} - ${item.price}
            <Button variant="primary" onClick={() => handleAddToCart(item)}>Add to Cart</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2 className="mt-4">Available Accessories</h2>
      <ListGroup>
        {accessories.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
            {item.name} - ${item.price}
            <Button variant="primary" onClick={() => handleAddToCart(item)}>Add to Cart</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default UserView;
