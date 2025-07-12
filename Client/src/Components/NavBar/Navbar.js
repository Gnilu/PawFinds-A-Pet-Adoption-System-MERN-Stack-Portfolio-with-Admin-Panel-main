import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/Logo.png";
import cart from "./images/cart.png";
import user from "./images/user.png";

const Navbar = ({ onAboutClick }) => {
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
            <button onClick={onAboutClick} className="about-link-btn">
              About Us
            </button>
          </li>
          <li>
            <Link to="/pets">Shop</Link>
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
      .navbar-container {
        position: sticky;
        top: 0;
        z-index: 100;
        background: white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 30px;
      }

      .navbar-links {
        display: flex;
        gap: 15px;
        padding: 8px 20px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50px;
        list-style: none;
      }

      li .about-link-btn {
        all: unset;
        cursor: pointer;
        display: inline-block;
        padding: 8px 14px;
        border-radius: 20px;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        background-clip: padding-box;
        transition: background 0.3s, color 0.3s;
      }

      .navbar-links a {
        padding: 8px 14px;
        
        transition: background 0.3s, color 0.3s;
        text-decoration: none;
        
        font-size: 14px;
      }

      .navbar-links a:hover {
        background: #f0f0f0;
        color: #ff6600;
      }

      li .about-link-btn:hover {
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
      }

      .dropdown-menu a:hover {
        background-color: #f5f5f5;
      }

      .user:hover, .cart:hover {
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