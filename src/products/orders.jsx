import React, { useState, useEffect } from 'react';
import { fetchUserOrders } from '../services/api';
import Header from '@components/header';
import Footer from '@components/footer';

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
    const interval = setInterval(fetchOrders, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []); 

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className="mb-4">Your Orders</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            {orders.map(order => (
              <div className="col-md-12 mb-4" key={order.id}>
                <div className="card">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={order.image_url} className="card-img" alt={order.name} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{order.name}</h5>
                        <p className="card-text">Name: {order.user}</p>
                        <p className="card-text">Product Name: {order.name}</p>
                        <p className="card-text order-status">Status: {order.status}</p>
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
