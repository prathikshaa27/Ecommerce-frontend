import React, { useState, useEffect } from 'react';

import { fetchUserOrders } from '../services/orders';
import Header from '@components/header';
import Footer from '@components/footer';

import './orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await fetchUserOrders();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user orders:', error);
        setLoading(false);
      }
    }

    fetchOrders();
  }, []); 

  const getStatusClass = (status) => {
    switch (status) {
      case 'processing':
        return 'status-processing';
      case 'in_transit':
        return 'status-in-transit';
      case 'delivered':
        return 'status-delivered';
      default:
        return '';
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="mb-4">Your Orders</h2>
        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>There are no orders.</p>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div className="col-md-12 mb-4" key={order.id}>
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={order.product_image_url} className="card-img" alt="Product" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Ordered By: {order.user_name}</h5>
                        <p>Price: {order.total_amount}</p>
                        <p className={`card-text ${getStatusClass(order.status)}`}>Status: {order.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Orders;

