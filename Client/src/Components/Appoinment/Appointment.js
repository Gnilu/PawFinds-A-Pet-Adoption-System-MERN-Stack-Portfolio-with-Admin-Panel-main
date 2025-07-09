
import React, { useState } from 'react';
import axios from 'axios';
import './Appointment.css';

export default function Appointment() {
  const [formData, setFormData] = useState({
    ownerName: '',
    telephone: '',
    address: '',
    petType: '',
    breed: '',
    date: '',
    timeSlot: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5500/api/appointments', formData);
      alert('Appointment submitted!');
    } catch (err) {
      alert('Error submitting form');
    }
  };

  return (
    <div className="appointment-container">
      <h1 className="appointment-title">
        Keep Your Little Friends Healthy
      </h1>

      <form className="appointment-form" onSubmit={handleSubmit}>
        <input name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
        <input name="telephone" placeholder="Telephone" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="petType" placeholder="Pet Type" onChange={handleChange} required />
        <input name="breed" placeholder="Breed" onChange={handleChange} required />
        <input name="date" type="date" onChange={handleChange} required />
        <select name="timeSlot" onChange={handleChange} required>
          <option value="">Select Time Slot</option>
          <option>8.00am to 10.00am</option>
          <option>10.00am to 12.00pm</option>
          <option>1.00pm to 3.00pm</option>
        </select>
        <button type="submit">Make an Appointment</button>
      </form>
    </div>
  );
}
