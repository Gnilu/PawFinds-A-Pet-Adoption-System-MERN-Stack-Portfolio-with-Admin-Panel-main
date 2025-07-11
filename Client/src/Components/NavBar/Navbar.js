import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/Logo.png";
import cart from "./images/cart.png";
import user from "./images/user.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <div className="navbar-container" ref={menuRef}>
        <div>
          <Link className="logo-container" to="/">
            <img className="navbar-logo" src={logo} alt="PetCare Logo" />
          </Link>
        </div>

        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/pets">Pets</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>

        <div style={{ position: "relative" }}>
          <Link to="/cart">
            <img className="cart" src={cart} alt="cart" />
          </Link>
          <img
            className="user"
            src={user}
            alt="user"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/login">Login</Link>
              <Link to="/user-account">Register</Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
      .navbar-links {
      display: flex;
      gap: 15px;
      padding: 8px 20px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 50px;
      list-style: none;
}
      .navbar-links a {
      padding: 8px 14px;
      border-radius: 20px;
      transition: background 0.3s, color 0.3s;
      text-decoration: none;
      color: #333;
      font-size:14px:
  }

      .navbar-links a:hover {
      background: #f0f0f0;
      color: #ff6600;
    }
     
      .dropdown-menu {
      position: absolute;
      right: 0;
      
      width: 180px;
      background: white;
      border: 1px solid orange;
      border-radius: 8px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      z-index: 1000;
    }

    .dropdown-menu a {
      display: block;
      padding: 10px 16px;
      color: #333;
      text-decoration: none;
      font-size: 14px;
      text:bold;
    }

    .dropdown-menu a:hover {
      background-color: #f5f5f5;
    }

    .user:hover {
      transform: scale(0.8);
      transition: transform 0.2s ease;
      box-shadow: 0 0 2px rgba(0,0,0,0.3);
      border-radius: 20%;
    }
      `}</style>
    </>
  );
};

export default Navbar;
