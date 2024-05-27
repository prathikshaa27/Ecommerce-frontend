import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './productdesign.css';

const Product = ({ product }) => {
  return (
    <Card className="product-card">
      <div className="product-image-container">
        <Link to={`/products/${product.id}`} className="card-link">
          <Card.Img variant="top" src={product.image_url} className="product-image" />
        </Link>
      </div>
      <Card.Body>
        <Card.Title className="product-title">{product.product_name}</Card.Title>
        <Card.Text className="product-price">${product.amount}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
