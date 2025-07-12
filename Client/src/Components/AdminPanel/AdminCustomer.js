import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios.get('/api/admin/customers') // Replace with your actual endpoint
      .then(res => setCustomers(res.data))
      .catch(err => console.error('Failed to fetch customers:', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      axios.delete(`/api/admin/customers/${id}`)
        .then(() => fetchCustomers())
        .catch(err => console.error('Delete failed:', err));
    }
  };

  return (
    <div className="admin-customers-container">
      <h2>Customers</h2>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Telephone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.telephone}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(customer._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
      .admin-customers-container {
  padding: 1.5rem;
}

.admin-customers-container h2 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

.customers-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.customers-table th,
.customers-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.customers-table th {
  background-color: #f3f4f6;
  font-weight: 600;
}

.delete-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 1rem;
}

.delete-btn:hover {
  color: #b91c1c;
}

      `}</style>
    </div>
  );
};

export default AdminCustomers;
