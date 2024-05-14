import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';

import { fetchCartProducts, removeFromCart, placeOrder, fetchUserProfile } from '../services/api';
import Header from '@components/header.jsx'; 
import Footer from '@components/footer.jsx'; 


const CartPage = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [user, setUser] = useState('');
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [userProfile, setUserProfile] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchCartItems();
        fetchUserDetails();
        if (location && location.state) { 
            setTotalPrice(location.state.totalPrice);
        }
    }, [location]);

    const fetchUserDetails = async () => {
        try {
            const userData = await fetchUserProfile();
            setUserDetails(userData);
            if (userData) {
                setUser(userData.username);
                setUserProfile(userData.profile);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            toast.error('Failed to fetch user details. Please try again later.');
        }
    };

    const fetchCartItems = async () => {
        try {
            const cartData = await fetchCartProducts();
            setCartItems(cartData);
            if (cartData.length > 0) {
                setProductId(cartData[0].id);
                setProductName(cartData[0].product_name);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            toast.error('Failed to fetch cart items. Please try again later.');
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await removeFromCart(productId);
            toast.success('Product removed from cart successfully!');
            fetchCartItems();
        } catch (error) {
            console.error('Error removing product from cart:', error);
            toast.error('Failed to remove product from cart. Please try again.');
        }
    };

    const handlePlaceOrderClick = async () => {
        try {
            if (userDetails && user && productId && productName) {
                if (cartItems.length > 0) { 
                    const orderData = {
                        user: user,
                        product_name: productId,
                    };
                    console.log('Order Data:', orderData);
                    await placeOrder(orderData);
                    toast.success('Your order has been placed successfully');
                    handleRemoveFromCart(productId)
                    fetchCartItems();
                    navigate('/')
                     
                } else {
                    toast.error('Your cart is empty. Please add items before placing an order.');
                }
            } else {
                toast.error('Please make sure all fields are filled.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        }
    };
    
    return (
        <>
            <Header />
            <Container className="mt-1">
                <h2 className="mb-4">Shopify Cart</h2>
                <Row>
                    <Col md={8}>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <>
                                {cartItems.map(item => (
                                    <Card key={item.id} className="mb-4">
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
                                            <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</Button>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {userDetails && (
                            <div className="mb-4">
                                <h4>Your Details</h4>
                                <p><strong>Username:</strong> {user}</p>
                                {userProfile && (
                                    <>
                                        <p><strong>Mobile:</strong> {userProfile.mobile}</p>
                                        <p><strong>Address:</strong> {userProfile.address}</p>
                                        <p><strong>Pincode:</strong> {userProfile.pincode}</p>
                                    </>
                                )}
                            </div>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p><strong>Total Price:</strong> ${totalPrice}</p>
                        <Form.Group controlId="formProduct">
                            <Form.Label>Select Product:</Form.Label>
                            <Form.Control
                                as="select"
                                value={productId}
                                onChange={(e) => {
                                    const selectedProduct = cartItems.find(item => item.id === parseInt(e.target.value));
                                    setProductId(selectedProduct.id);
                                    setProductName(selectedProduct.product_name);
                                }}
                            >
                                <option value="">Select Product</option>
                                {cartItems.map(item => (
                                    <option key={item.id} value={item.id}>{item.product_name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button
                            variant="primary"
                            onClick={handlePlaceOrderClick}
                            className="mt-4"
                        >
                            Place Order
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default CartPage;