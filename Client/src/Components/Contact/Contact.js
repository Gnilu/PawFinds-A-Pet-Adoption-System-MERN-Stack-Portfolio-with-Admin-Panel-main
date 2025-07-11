import React from "react";
import Map from './images/Map.png';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contactUs-main-container">
      <div className="contactUs-left-para">
        <h3>Let's get in touch</h3>
        <i class="fa fa-envelope"></i>
        <a class="mail-links" href="mailto:petcare@gmail.com">
          petcare@gmail.com
        </a>

        <i class="fa fa-phone"></i>
        <a class="mail-links" href="tel:+923019583959">
          +94 70 677 9667
        </a>

        
        <i class="fa-solid fa-location-dot"></i>
        <p>  Pambahinna</p>
      </div>
      <div className="contactUs-pic">
        <img src={Map} alt="Location"/>
      </div>
    </div>
  );
};

export default Contact;
