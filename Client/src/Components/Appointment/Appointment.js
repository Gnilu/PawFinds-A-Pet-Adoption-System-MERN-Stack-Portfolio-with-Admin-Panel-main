import React, { useState } from "react";
import axios from "axios";
import "./Appointment.css";
import Doctor from "./images/doctor.jpg";

export default function Appointment() {
  const [formData, setFormData] = useState({
    ownerName: "",
    telephone: "",
    address: "",
    petType: "",
    breed: "",
    date: "",
    timeSlot: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5500/api/appointments", formData);
      alert("Appointment submitted!");
    } catch (err) {
      alert("Error submitting form");
    }
  };

  return (
    <div className="appointment-container">
      <h1 className="appointment-title">Keep Your Little Friends Healthy</h1>

      <div>
        <form className="appointment-form" onSubmit={handleSubmit}>
          <input
            name="ownerName"
            placeholder="Owner Name"
            onChange={handleChange}
            required
          />
          <input
            name="telephone"
            placeholder="Telephone"
            onChange={handleChange}
            required
          />
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
          />
          <input
            name="petType"
            placeholder="Pet Type"
            onChange={handleChange}
            required
          />
          <input
            name="breed"
            placeholder="Breed"
            onChange={handleChange}
            required
          />
          <input name="date" type="date" onChange={handleChange} required />
          <select name="timeSlot" onChange={handleChange} required>
            <option value="">Select Time Slot</option>
            <option>5.00pm to 6.00pm</option>
            <option>6.00pm to 7.00pm</option>
            <option>7.00pm to 8.00pm</option>
          </select>
          <button type="submit">Make an Appointment</button>
        </form>
      </div>
      <div className="doctor-details">
        <img
          src={Doctor}
          alt="Dr. S.K.N. Priyangika"
          className="doctor-image"
        />
        <div className="doctor-info">
          <h3>Dr. S.K.N. Priyangika</h3>
          <p>Senior Veterinary Surgeon</p>
          <p>Available: Monday - Saturday</p>
          <p>Contact: +94 70 677 9667</p>
          <p>Location: Pambahinna</p>
        </div>
      </div>
    </div>
  );
}
