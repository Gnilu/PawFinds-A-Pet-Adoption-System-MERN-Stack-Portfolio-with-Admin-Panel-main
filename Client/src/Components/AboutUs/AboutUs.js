import React from "react";
import aboutImage from "./images/Doctor-with-cat.png"; // adjust path if needed

const AboutUsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        <div className="modal-body">
          <img
            src={aboutImage}
            alt="About Us"
            className="modal-image"
          />

          <div className="modal-text">
            <h2>About Us</h2>
            <p>
              Welcome to PetCare! We are dedicated to connecting loving homes with pets
              who need them. Our mission is to make adoption seamless, transparent,
              and joyful.
            </p>
            <p>
              Whether you’re looking for a loyal companion or want to support our
              rescue initiatives, we’re here for you. Thank you for choosing to make a
              difference.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          height: 100%; width: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 800px;
          width: 90%;
          position: relative;
          animation: fadeIn 0.3s ease;
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 22px;
          cursor: pointer;
        }
        .modal-body {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .modal-image {
          flex: 1 1 40%;
          max-width: 300px;
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .modal-text {
          flex: 1 1 50%;
          text-align: left;
          
        }
        .modal-text h2 {
          margin-top: 0;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* For mobile screens */
        @media (max-width: 600px) {
          .modal-body {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .modal-text {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUsModal;
