import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import cart from "./images/cart.png";
import user from "./images/user.png";

const Navbar = (props) => {
  return (
    <div className="navbar-container">
      <div>
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="PetCare Logo" />
          
        </Link>
      </div>
      <div>
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
      </div>
      <div>
        <Link to="/cart">
         <img className="cart" src={cart} alt="cart" />
        </Link>
         <img className="user" src={user} alt="user" />
      </div>
    </div>
  );
};

export default Navbar;
