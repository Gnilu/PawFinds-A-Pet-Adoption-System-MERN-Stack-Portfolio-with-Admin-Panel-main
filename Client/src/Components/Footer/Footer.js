import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import Logo from "../../Images/Logo.png";
import Footer_bg from "../../Images/Footer_img.jpeg"; 

const Footer = () => {
  return (
    <footer style={{ 
      ...styles.footer, 
      backgroundImage: `url(${Footer_bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "rgba(255, 255, 255, 0.8)", 
  backgroundBlendMode: "overlay" 
    }}>
      <div style={{ ...styles.section, ...styles.left }}>
        <img src={Logo} alt="PetCare Logo" style={styles.logo} />
        <h3 style={styles.clinicName}>Pet Care Clinic</h3>
        <div style={{ ...styles.section, ...styles.box }}>
          <p style={styles.contact}><FaPhone /> Phone: +94 70 677 9667</p>
          <p style={styles.contact}><FaEnvelope /> Email: vspetcarepambahinna@gmail.com</p>
        </div>
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
    padding: "10px 10px",
    borderTopLeftRadius: "35px",
    borderTopRightRadius: "35px",
    textAlign: "center",
    color: "black",
    position: "relative",
  },
  section: {
    display: "inline-block",
    verticalAlign: "top",
    margin: "0 15px",
  },
  left: {
    textAlign: "left",
    width: "45%",
  },
  box: {
    border: "1px solid #333",
    borderRadius: "5px",
    padding: "5px",
    marginTop: "5px",
    marginLeft: "120px"
  },
  logo: {
    width: "120px",
    height: "auto",
    marginBottom: "1px",
    marginLeft: "100px"
  },
  clinicName: {
    color: "#f18040",
    marginTop: "0px",
    fontSize: "20px",
    marginLeft: "120px"
  },
  contact: {
    margin: "4px 0px",
    fontSize: "14px",
    
  },
  right: {
    width: "45%",
    textAlign: "center",
  },
  rightText: {
    fontSize: "25px",
    marginBottom: "10px",
    marginTop: "50px"
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
    fontSize: "15px",
    color: "#333",
    
  },
};

export default Footer;
