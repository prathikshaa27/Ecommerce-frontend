import React, { useState, useEffect } from 'react';
import { fetchCartProducts, removeFromCart, placeOrder } from '../services/api'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Container, Form } from 'react-bootstrap';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [formData, setFormData] = useState({ user: '', productName: '', quantity: '' });

    useEffect(() => {
        fetchCartItems(); 
    }, []);

    const fetchCartItems = async () => {
        try {
            const cartData = await fetchCartProducts(); 
            setCartItems(cartData);
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

    const handlePlaceOrderClick = () => {
        setShowOrderForm(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { productName, quantity } = formData;
            const orderData = { product_name: productName, quantity: quantity, user: formData.user };
            await placeOrder(orderData);
            toast.success('Your order has been placed successfully');
            setFormData({ user: '', productName: '', quantity: '' });
            setShowOrderForm(false);
            fetchCartItems();
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        }
    };

    return (
        <Container className="mt-1">
            <h2 className="mb-4">Shopify Cart</h2>
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
                                style={{ maxHeight: '100px',maxWidth:'200px', objectFit: 'cover' }} 
                            />
                            <Card.Body>
                                <Card.Title>{item.product_name}</Card.Title>
                                <Card.Text>Description: {item.description}</Card.Text>
                                <Card.Text>Price: ${item.amount}</Card.Text>
                                <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</Button>
                            </Card.Body>
                        </Card>
                    ))}
                    <Button variant="primary" onClick={handlePlaceOrderClick} className="mt-4">Place Order</Button>
                    {showOrderForm && (
                        <Form onSubmit={handleSubmit} className="mt-4">
                            <Form.Group controlId="name">
                                <Form.Label>Your Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your name" name="user" value={formData.user} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="productName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter product name" name="productName" value={formData.productName} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" placeholder="Enter quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
                            </Form.Group>
                            <Button variant="primary" type="submit">Place Order</Button>
                        </Form>
                    )}
                </>
            )}
        </Container>
    );
};

export default CartPage;


