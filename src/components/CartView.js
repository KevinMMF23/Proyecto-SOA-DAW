// src/components/CartView.js
import React, { useContext } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

function CartView() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleIncreaseQuantity = (productId) => {
    updateQuantity(productId, cart.find(item => item.id === productId).quantity + 1);
  };

  const handleDecreaseQuantity = (productId) => {
    const currentItem = cart.find(item => item.id === productId);
    if (currentItem.quantity > 1) {
      updateQuantity(productId, currentItem.quantity - 1);
    }
  };

  return (
    <Container className="mt-4">
      <h1>Shopping Cart</h1>
      <ListGroup>
        {cart.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
            <div>
              {item.name} - ${item.price} x {item.quantity}
            </div>
            <div>
              <Button variant="secondary" onClick={() => handleDecreaseQuantity(item.id)}>-</Button>
              <Button variant="secondary" onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
              <Button variant="danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2 className="mt-4">
        Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}
      </h2>
    </Container>
  );
}

export default CartView;
