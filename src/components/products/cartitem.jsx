import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const CartItem = ({ item, onQuantityChange, onRemoveFromCart }) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={item.image_url}
        alt={item.product_name}
        style={{ maxHeight: '100px', maxWidth: '200px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title>{item.product_name}</Card.Title>
        <Card.Text>Description: {item.description}</Card.Text>
        <Card.Text>Price: ${item.amount}</Card.Text>
        <Form.Group controlId={`quantity-${item.product_id}`}>
          <Form.Label>Quantity</Form.Label>
          <Form.Control 
            type="number" 
            value={item.quantity} 
            onChange={(e) => onQuantityChange(item.product_id, parseInt(e.target.value))} 
          />
        </Form.Group>
        <Button variant="danger" onClick={() => onRemoveFromCart(item.product_id)}>Remove from Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default CartItem;

