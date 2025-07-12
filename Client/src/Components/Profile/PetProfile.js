// src/PetProfilePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './PetProfile.css';


const PetProfilePage = () => {
  const { id } = useParams();
  return (
    <div className="pet-profile">
      <h2>Pet Profile - ID {id}</h2>
      <div className="pet-details">
        <input placeholder="Pet Name" readOnly />
        <input placeholder="Species" readOnly />
        <input placeholder="Breed" readOnly />
        <input placeholder="Age" readOnly />
        <input placeholder="Gender" readOnly />
        <button>Save Changes</button>
      </div>
      <div className="records">
        <h3>Vaccination</h3>
        <div className="record-list">Vaccination records uploaded by admin</div>

        <h3>Medical Reports</h3>
        <div className="record-list">Medical reports uploaded by admin</div>
      </div>
    </div>
  );
};

export default PetProfilePage;