import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { getProductDetails, addToCart } from '../services/api';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const productData = await getProductDetails(productId);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleAddToCart = async () => {
    const isAuthenticated = document.cookie.includes('authToken');

    if (!isAuthenticated) {
      navigate('/home');
      return;
    }

    try {
      await addToCart(productId, quantity); 
      toast.success('Product added to cart successfully!');
      navigate(`/products/${productId}/cart`);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart. Please try again.');
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value)); 
  };

  return (
    <Container className="mt-5">
      {product ? (
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img variant="top" src={product.image_url} alt={product.product_name} />
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>{product.product_name}</Card.Title>
                <Card.Text>Price: ${product.amount}</Card.Text>
                <Card.Text>Description: {product.description}</Card.Text>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" value={quantity} onChange={handleQuantityChange} />
                </Form.Group>
                <Button onClick={handleAddToCart}>Add to Cart</Button>
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
