import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { getProductDetails, addToCart } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailPage = () => {
  const navigate=useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  },[] );

  const fetchProductDetails = async () => {
    try {
      const productData = await getProductDetails(productId);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(productId);
      toast.success('Product added to cart successfully!');
      navigate('./cart')

    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart. Please try again.');
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

