import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaTrash } from 'react-icons/fa';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get('http://localhost:5000/api/appointments') // Replace with actual endpoint
      .then(res => setAppointments(res.data))
      .catch(err => console.error('Error fetching appointments:', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      axios.delete(`http://localhost:5000/api/admin/appointments/${id}`)
        .then(() => fetchAppointments())
        .catch(err => console.error('Delete failed:', err));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    axios.put(`http://localhost:5000/api/admin/appointments/${id}/status, { status: newStatus }`)
      .then(() => fetchAppointments())
      .catch(err => console.error('Status update failed:', err));
  };

  const viewUserProfile = (userId) => {
    // Replace with navigation logic (React Router or modal)
    window.location.href = `http://localhost:5000/admin/user-profile/${userId}`;
  };

  return (
    <div className="admin-appointments-container">
      <h2>Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Pet Type</th>
            <th>Telephone</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment._id}>
              <td data-label="Owner Name">{appointment.ownerName}</td>
              <td data-label="Pet Type">{appointment.petType}</td>
              <td data-label="Telephone">{appointment.telephone}</td>
              <td data-label="Date & Time">{appointment.date} {appointment.time}</td>
              <td data-label="Status">
                <select
                  value={appointment.status}
                  onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td data-label="Action" className="action-buttons">
                <button onClick={() => viewUserProfile(appointment.userId)} className="view-btn">
                  <FaEye />
                </button>
                <button onClick={() => handleDelete(appointment._id)} className="delete-btn">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
      .admin-appointments-container {
  padding: 1.5rem;
}

.admin-appointments-container h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.appointments-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.appointments-table th,
.appointments-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.appointments-table th {
  background-color: #f1f5f9;
  font-weight: 600;
}

.appointments-table select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  background-color: #f9fafb;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.view-btn,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: #475569;
}

.view-btn:hover {
  color: #2563eb;
}

.delete-btn:hover {
  color: #ef4444;
}

/* Responsive styles for screen width below 600px */
  @media (max-width: 600px) {
    .appointments-table thead {
      display: none;
    }
      .appointments-table,
    .appointments-table tbody,
    .appointments-table tr,
    .appointments-table td {
      display: block;
      width: 100%;
    }

    .appointments-table tr {
      margin-bottom: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    }

    .appointments-table td {
      text-align: right;
      position: relative;
      padding-left: 50%;
    }

    .appointments-table td::before {
      content: attr(data-label);
      position: absolute;
      left: 16px;
      top: 12px;
      font-weight: bold;
      color: #475569;
      text-align: left;
    }
  }

      `}</style>
    </div>
  );
};

export default AdminAppointments;