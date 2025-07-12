import React from "react";
import DoctorImage from "./images/Doctor-with-cat.png";

const AboutCanvas = ({ isOpen, onClose }) => {
  return (
    <div className={`about-canvas ${isOpen ? "show" : ""}`}>
      <div className="canvas-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="content-wrapper">
          <div className="image-section">
            <img src={DoctorImage} alt="Doctor with cat" />
          </div>
          <div className="text-section">
            <h2>Welcome to our Pet Care Clinic!!</h2>
            <p>
              We're dedicated to provide compassionate and comprehensive care
              for your beloved pets. We offer a wide range of veterinary
              services tailored to meet the unique needs of each furry friend.
              From routine check-ups and vaccinations to advanced diagnostics
              and surgery, we are committed to ensuring the health and happiness
              of your pets. Whether you're visiting us for preventive care or
              seeking treatment for an illness or injury, you can trust that
              your pet will receive the highest quality care in a welcoming and
              supportive environment.
            </p>
          </div>
        </div>
      </div>

      {/* Styling */}
      <style>{`
        .about-canvas {
          background-color: white;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          animation: slideDown 0.4s ease;
          z-index: 10;
        }

        .canvas-content {
          padding: 2rem;
          max-width: 1000px;
          margin: auto;
          position: relative;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 2rem;
          color: #333;
          position: absolute;
          top: 15px;
          right: 20px;
          cursor: pointer;
        }

        .content-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .image-section img {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
          object-fit: cover;
        }

        .image-section {
          flex: 1 1 300px;
        }

        .text-section {
          flex: 2 1 400px;
        }

        .text-section h2 {
          color: #2f4858;
          margin-bottom: 1rem;
        }

        .text-section p {
          font-size: 1rem;
          color: #444;
          line-height: 1.6;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
            text-align: center;
          }

          .close-btn {
            top: 10px;
            right: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutCanvas;
