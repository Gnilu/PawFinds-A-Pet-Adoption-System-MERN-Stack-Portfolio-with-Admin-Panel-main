import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Images/Logo.png";
import cart from "./images/cart.png";
import user from "./images/user.png";

const Navbar = ({ onAboutClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // for mobile toggle

  useEffect(() => {
    const handler = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleServicesClick = () => {
    navigate("/"); // Go to Home
    setTimeout(() => {
      const section = document.getElementById("services");
      section?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Delay to ensure page renders before scroll
  };

  return (
    <>
      <div className="navbar-container" ref={menuRef}>
        <div>
          <Link className="logo-container" to="/">
            <img className="navbar-logo" src={logo} alt="PetCare Logo" />
          </Link>
        </div>

        <ul className={`navbar-links ${showMenu ? "show" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                handleServicesClick();
              }}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                onAboutClick();
              }}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link to="/pets">Shop</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>

        <div className="nav-right" style={{ position: "relative" }}>
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

          <button className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
            ☰
          </button>
        </div>
      </div>

      <style>{`
      .navbar-container {
        position: sticky;
        width: 100%;
        top: 0;
        z-index: 100;
        background: white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 30px;
        margin-bottom: 10px;
      }

      .navbar-links {
        display: flex;
        gap: 15px;
        padding: 8px 20px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50px;
        list-style: none;
        text-decoration: none;
        font-family: 'Oxygen', sans-serif;
        font-weight: bold;
      }

    

      .navbar-links a {
        display: inline-block;
        padding: 8px 14px;
        border-radius: 20px;
        text-decoration: none;
        color: #333;
        font-size: 14px;
        font-weight: bold;
        transition: background 0.3s, color 0.3s;
}

      .navbar-links a:hover {
        background: #f0f0f0;
        color: #ff6600;
      }

      .nav-right {
        display: flex;
        align-items: center;
        gap: 12px;
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

      /* Hide menu icon on desktop */
      .menu-icon {
  display: none;
  font-size: 22px;
  background-color: white;
  color: #333;
  border: 2px solid #ccc;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 36px;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: background 0.3s ease, transform 0.2s ease;
}

.menu-icon:hover {
  background-color: #f5f5f5;
  transform: scale(1.05);
}

/* Responsive styles for 760px and below */
@media (max-width: 768px) {
  .menu-icon {
    display: block;
    color: #333;
  }

  .navbar-links {
    position: fixed;
    top: 60px;
    right: 0;
    left: 70%;
    width: 20%;
    background: white;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    padding: 15px;
    display: none;
    box-shadow: -2px 0 10px rgba(0,0,0,0.15);
    box-sizing: border-box;
    align: right;
  }

  .navbar-links.show {
    display: flex;
  }
}

      `}</style>
    </>
  );
};

export default Navbar;
