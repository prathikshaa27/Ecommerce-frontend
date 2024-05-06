import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './productdetailpage.css';
import Cookies from 'js-cookie';

const csrftoken = Cookies.get('csrftoken');

axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, );

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/${productId}/`, { withCredentials: true });
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      await axios.post(`http://localhost:8000/api/cart/${productId}/`, {}, { withCredentials: true });
      console.log('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/${productId}/`, { withCredentials: true });
      console.log('Product removed from cart successfully!');
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  return (
    <Container className="mt-5">
      {product ? (
        <Row>
          <Col md={6}>
            <Card className="product-image-card">
              <Card.Img variant="top" src={product.image_url} alt={product.product_name} />
            </Card>
          </Col>
          <Col md={6}>
            <Card className="product-details-card">
              <Card.Body>
                <Card.Title className="product-name">{product.product_name}</Card.Title>
                <Card.Text className="product-price">Price: ${product.amount}</Card.Text>
                <Card.Text className="product-description">Description: {product.description}</Card.Text>
                <div className="product-buttons">
                  <Button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</Button>
                  <Button className="remove-from-cart-btn" onClick={handleRemoveFromCart}>Remove from Cart</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Loading product details...</p>
      )}
    </Container>
  );
};

export default ProductDetailPage;


