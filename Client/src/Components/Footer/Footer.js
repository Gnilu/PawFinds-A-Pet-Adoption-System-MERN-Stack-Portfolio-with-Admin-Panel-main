import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import './Footer.css';

const Footer = (props) => {
  return (
    <footer className="footer">
      <div>
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="PawFinds Logo" />
        </Link>
      </div>
      <div className="below-footer">
        <div>
          <p>You can reach me at{" "}</p>
          <div>
            <i class="fa fa-envelope"></i>{" "}            
            <a className="mail-links" href="mailto:petcare@gmail.com">
            petcare@gmail.com
          </a>          
          </div>      
          <div>
            <i class="fa fa-phone"></i>{" "}
            <a class="mail-links" href="tel:+923019583959">
          +92 301 9583959
        </a>
          </div>
        </div>
        <p>
        
        </p>
        <p>&copy; 2025 Pet Care Vet Clinic. All right reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
