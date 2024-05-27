import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { getProductDetails, addToCart } from '../../services/products';
import Header from '../dashboard/header'; 
import Footer from '../dashboard/footer'; 

import './productdetailpage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const productData = await getProductDetails(productId);
      setProduct(productData);
      setTotalPrice(productData.amount * quantity);
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
      navigate('/cart'); 
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart. Please try again.');
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    setTotalPrice(product.amount * newQuantity);
  };

  return (
    <>
      <Header />
      <Container className="product-detail-container mt-5">
        {product ? (
          <Row>
            <Col md={6}>
              <div className="product-image-container">
                <img src={product.image_url} alt={product.product_name} className="product-image" />
              </div>
            </Col>
            <Col md={6}>
              <div className="product-details">
                <h2 className="product-title">{product.product_name}</h2>
                <p className="product-price">Price: ${product.amount}</p>
                <p className="total-price">Total Price: ${totalPrice}</p> 
                <p className="product-description">Description: {product.description}</p>
                <Form.Group controlId="quantity" className="quantity-group">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" value={quantity} onChange={handleQuantityChange} />
                </Form.Group>
                <Button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</Button>
              </div>
            </Col>
          </Row>
        ) : (
          <p>Loading product details...</p>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
