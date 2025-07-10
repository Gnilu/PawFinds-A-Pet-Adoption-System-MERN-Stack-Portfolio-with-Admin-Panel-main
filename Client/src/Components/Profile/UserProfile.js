// src/UserProfilePage.js
import React, { useState } from 'react';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '', address: '' });
  const [pets, setPets] = useState([]);
  const [showPetForm, setShowPetForm] = useState(false);
  const [petDetails, setPetDetails] = useState({ name: '', image: '' });

  const handleUserChange = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  const handlePetChange = (e) => setPetDetails({ ...petDetails, [e.target.name]: e.target.value });

  const addPetProfile = () => {
    setPets([...pets, { ...petDetails, id: pets.length + 1 }]);
    setPetDetails({ name: '', image: '' });
    setShowPetForm(false);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="user-details">
        <input name="name" placeholder="Name" value={userDetails.name} onChange={handleUserChange} />
        <input name="email" placeholder="Email" value={userDetails.email} onChange={handleUserChange} />
        <input name="phone" placeholder="Phone" value={userDetails.phone} onChange={handleUserChange} />
        <input name="address" placeholder="Address" value={userDetails.address} onChange={handleUserChange} />
        <button>Save Changes</button>
      </div>

      <button onClick={() => setShowPetForm(!showPetForm)}>Add Pet Profile</button>

      {showPetForm && (
        <div className="pet-form">
          <input name="name" placeholder="Pet Name" value={petDetails.name} onChange={handlePetChange} />
          <input name="image" placeholder="Image URL" value={petDetails.image} onChange={handlePetChange} />
          <button onClick={addPetProfile}>Create Pet Profile</button>
        </div>
      )}

      <div className="pet-cards">
        {pets.map(pet => (
          <div key={pet.id} className="pet-card" onClick={() => navigate(`/pet-profile/${pet.id}`)}>
            <img src={pet.image || 'https://via.placeholder.com/100'} alt={pet.name} />
            <p>{pet.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfilePage;