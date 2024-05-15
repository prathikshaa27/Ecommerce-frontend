import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { fetchCartProducts, removeFromCart, placeOrder, fetchUserProfile } from '../services/api';
import Header from '@components/header.jsx'; 
import Footer from '@components/footer.jsx'; 

import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';

const CartPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userProfile, setUserProfile] = useState(null);

    const userProfilePromise = useMemo(() => fetchUserProfile(), []); 

    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        userProfilePromise.then((response) => setUserProfile(response));
    }, [userProfilePromise]);

    const fetchCartItems = async () => {
        try {
            const response = await fetchCartProducts();
            setCartItems(response.cart_items);
            setTotalPrice(response.total_amount);
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
            await placeOrder();
            toast.success('Order placed successfully!');
            navigate('/'); 
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.product_id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        
        const newTotalPrice = updatedCartItems.reduce((total, item) => {
            return total + item.amount * item.quantity;
        }, 0);
        setTotalPrice(newTotalPrice);
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
                                    <Card key={item.product_id} className="mb-4">
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
                                                    onChange={(e) => handleQuantityChange(item.product_id, parseInt(e.target.value))} 
                                                />
                                            </Form.Group>
                                            <Button variant="danger" onClick={() => handleRemoveFromCart(item.product_id)}>Remove from Cart</Button>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </>
                        )}
                    </Col>
                    <Col md={4}>
                        {userProfile && (
                            <div>
                                <h4>User Profile</h4>
                                <p><strong>Username:</strong> {userProfile.username}</p>
                                {userProfile.profile && (
                                    <>
                                        <p><strong>Mobile:</strong> {userProfile.profile.mobile}</p>
                                        <p><strong>Address:</strong> {userProfile.profile.address}</p>
                                        <p><strong>Pincode:</strong> {userProfile.profile.pincode}</p>
                                        <p><strong>Total Price:</strong> ${totalPrice}</p>
                                    </>
                                )}
                                <Button
                                    variant="primary"
                                    onClick={handlePlaceOrderClick}
                                    className="mt-4"
                                >
                                    Place Order
                                </Button>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default CartPage;

