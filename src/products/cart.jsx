import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {Form} from 'react-bootstrap';
import { fetchCartProducts, removeFromCart, placeOrder, fetchUserProfile } from '../services/api';
import Header from '@components/header.jsx'; 
import Footer from '@components/footer.jsx'; 
import { Button, Container, Row, Col } from 'react-bootstrap';
import CartItem from './cartitem';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userProfile, setUserProfile] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState(''); 
    const navigate = useNavigate();

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
            if (!deliveryAddress) {
                toast.error('Please select a delivery address.');
                return;
            }

            await placeOrder(deliveryAddress); 
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
                                    <CartItem 
                                      key={item.product_id} 
                                      item={item} 
                                      onQuantityChange={handleQuantityChange} 
                                      onRemoveFromCart={handleRemoveFromCart} 
                                    />
                                ))}
                            </>
                        )}
                    </Col>
                    <Col md={4}>
                        {userProfile && (
                            <div>
                                <h4>User Profile</h4>
                                <p><strong>Name:</strong> {userProfile.username}</p>
                                <p><strong>Mobile:</strong> {userProfile.profile.mobile}</p>
                                <p><strong>Pincode:</strong>{userProfile.profile.pincode}</p>
                                <Form.Group controlId="deliveryAddress">
                                    <Form.Label>Select Delivery Address</Form.Label>
                                    <Form.Control as="select" onChange={(e) => setDeliveryAddress(e.target.value)}>
                                        <option value="">Select Address</option>
                                        {userProfile.profile.addresses.map((address, index) => (
                                            <option key={index} value={address}>{address}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <p><strong>Total Price:</strong> ${totalPrice}</p>
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

