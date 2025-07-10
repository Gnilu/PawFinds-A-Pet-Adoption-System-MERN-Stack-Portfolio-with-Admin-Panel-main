// UserProfile.js
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const UserAccount = () => {
  const [user, setUser] = useState({ name: '', address: '', email: '', contact: '' });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSaveUser = () => {
    alert('User Account saved!');
  };

  return (<section className='user-account'>
    <div style={styles.profileContainer}>
      <h2>User Profile</h2>
      <input style={styles.input} name="name" placeholder="Name" value={user.name} onChange={handleUserChange}  required/>
      <input style={styles.input} name="address" placeholder="Address" value={user.address} onChange={handleUserChange} required />
      <input style={styles.input} name="email" placeholder="Email" value={user.email} onChange={handleUserChange} required />
      <input style={styles.input} name="contact" placeholder="Contact Number" value={user.contact} onChange={handleUserChange} required/>
      <div style={styles.btnGroup}>
        <button style={styles.cancelButton} onClick={() => setUser({ name: '', address: '', email: '', contact: '' })}>Cancel</button>
        <button style={styles.saveButton} onClick={handleSaveUser}>Save Changes</button>
      </div>
    </div>
 </section> );
};

const styles = {
  profileContainer: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px'
  },
  btnGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  cancelButton: {
    backgroundColor: '#aaa',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  saveButton: {
    backgroundColor: '#ffa54f',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default UserAccount;
