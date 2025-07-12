import React, { useState, useEffect } from 'react';
import './Admin.css'; 
import logo from '../../Images/Logo.png'; 

function AdminNavBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="navbar-brand">Admin Panel</span>
      </div>
      <div className="navbar-time">{currentTime.toLocaleString()}</div>
      <h3 className="logout-btn" onClick={() => window.location.reload()}>Logout</h3>
    </nav>
  );
}

export default AdminNavBar;
