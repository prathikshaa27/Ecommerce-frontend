import React, { useState, useEffect } from 'react';
import { fetchUserOrders } from '../services/api';

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

  return (
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
                    <img src={order.product.image_url} className="img-fluid" alt={order.product.name} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{order.product.name}</h5>
                      <p className="card-text">{order.product.description}</p>
                      <p className="card-text">Quantity: {order.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
