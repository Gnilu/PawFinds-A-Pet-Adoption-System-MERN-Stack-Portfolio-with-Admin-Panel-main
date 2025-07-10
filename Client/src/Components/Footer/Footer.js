import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import Logo from "../../Images/Logo.png";
import Footer_img from "../../Images/Footer_img.png";

const Footer = () => {
  
  return (
    <footer style={styles.footer}>
      <div style={{ ...styles.section, ...styles.left }}>
        <img src={Logo} alt="PetCare Logo" style={styles.logo} />
        <h3 style={styles.clinicName}>Pet Care Clinic</h3>
        <div style={{ ...styles.section, ...styles.box }}>
          <p style={styles.contact}><FaPhone /> Phone: (123) 456-7890</p>
          <p style={styles.contact}><FaEnvelope /> Email: petcare@gmail.com</p>
        </div>
      </div>

      <div style={{ ...styles.section, ...styles.center }}>
        <img src={Footer_img} alt="Happy Pets" style={styles.footerImage} />
      </div>

      <div style={{ ...styles.section, ...styles.right }}>
        <p style={styles.rightText}>
          Ready to start your pet’s journey to better health?
        </p>
        <button style={styles.btn}>Make an Appointment</button>
      </div>

      <div style={styles.bottom}>
        <hr style={styles.hr} />
        <p style={styles.bottomText}>© 2025 Pet Care Vet Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
};
const styles = {
    footer: {
      background: "#a0dce0",
      padding: "30px 40px",
      borderTopLeftRadius: "35px",
      borderTopRightRadius: "35px",
      textAlign: "center",
    },
    section: {
      display: "inline-block",
      verticalAlign: "top",
      margin: "0 15px",
    },
    
    left: {
      textAlign: "left",
      width: "30%",
    },

    box:{
      border:"box" ,
      color:"black",
      borderRadius:"5px",
      marginTop:"5px"
    },
    logo: {
      width: "120px",
      height: "auto",
      marginBottom: "2px",
    },
    clinicName: {
      color: "#f18040",
      marginTop: "2px",
      fontSize:"20px",
    },
    contact: {
      margin: "5px 0",
      fontSize: "14px",
    },
    center: {
      width: "30%",
    },
    footerImage: {
      width: "80%",
      height: "auto",
      marginTop:"10px",
      align:"center",
    },
    right: {
      width: "30%",
      textAlign: "center",
    },
    rightText: {
      fontSize: "25px",
      marginBottom: "10px",
      marginTop:"50px"
    },
    btn: {
      background: "#f18040",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "20px",
      cursor: "pointer",
    },
    bottom: {
      marginTop: "20px",
    },
    hr: {
      border: 0,
      borderTop: "2px solid #333",
      margin: "10px 0",
      width: "95%",
    },
    bottomText: {
      fontSize: "12px",
      color: "#333",
    },
  };

export default Footer;

