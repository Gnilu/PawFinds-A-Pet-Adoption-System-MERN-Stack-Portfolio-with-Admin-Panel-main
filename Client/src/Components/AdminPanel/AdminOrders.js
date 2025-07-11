import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('/api/admin/orders') // Replace with your backend endpoint
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Error fetching orders:', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      axios.delete(`/api/admin/orders/${id}`)
        .then(() => fetchOrders())
        .catch((err) => console.error('Delete failed:', err));
    }
  };

  return (
    <div className="admin-orders-container">
      <h2>Order Reservations</h2>
      <div className="orders-grid">
        {orders.map(order => (
          <div className="order-card" key={order._id}>
            <div><strong>Reservation ID:</strong> {order._id}</div>
            <div><strong>User Name:</strong> {order.userName}</div>
            <div><strong>Address:</strong> {order.address}</div>
            <div><strong>Telephone:</strong> {order.telephone}</div>
            <div><strong>Email:</strong> {order.email}</div>
            <div><strong>Product:</strong> {order.productName}</div>
            <div><strong>Quantity:</strong> {order.quantity}</div>
            <div><strong>Price:</strong> Rs. {order.price}</div>
            <div><strong>Status:</strong> 
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <div className="card-actions">
              <button className="delete-btn" onClick={() => handleDelete(order._id)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
      .admin-orders-container {
  padding: 1.5rem;
}

.admin-orders-container h2 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.order-card {
  background: #fff;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: transform 0.2s ease;
}

.order-card:hover {
  transform: scale(1.01);
}

.order-card div {
  font-size: 0.95rem;
}

.status {
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 20px;
  margin-left: 6px;
}

.status.buy {
  background-color: #d1fae5;
  color: #065f46;
}

.status.not {
  background-color: #fee2e2;
  color: #991b1b;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.6rem;
}

.delete-btn {
  display: flex;
  align-items: center;
  background: #ef4444;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  gap: 6px;
  transition: background 0.2s;
}

.delete-btn:hover {
  background: #dc2626;
}

      `}</style>
    </div>
  );
};

export default AdminOrders;
