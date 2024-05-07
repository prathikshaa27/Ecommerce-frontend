import React, { useState, useEffect } from 'react';
import { fetchCartProducts } from '../services/api'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CartPage;
