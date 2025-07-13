import React from 'react';
import { useNavigate } from 'react-router-dom';

const PetsViewer = (props) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const payload = {
      item_id: props.pet._id  // ✅ Correct key for your backend
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      const result = await response.json();
      alert("Added to cart successfully!");
      navigate("/cart");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className='pet-view-card'>
      <div className='pet-card-pic'>
        <img
          src={`http://localhost:5000/images/${props.pet.filename.replace('pet-image/', '')}`}
          alt={props.pet.name}
        />
      </div>
      <div className='pet-card-details'>
        <h2>{props.pet.name}</h2>
        <p><b>Price:</b> {props.pet.age}</p> {/* ✅ Showing 'age' as price */}
      </div>
      <div className='show-interest-btn'>
        <button onClick={handleAddToCart}>Add To Cart <i className="fa fa-paw"></i></button>
      </div>

      <style>{`
        .pet-view-card {
          display: flex;
          flex-direction: column;
          margin: 20px;
          border: 1px solid;
          border-radius: 15px;
          width: 260px;
          height: auto;
          background-color: white;
          padding: 10px;
          justify-content: center;
        }

        .pet-card-pic {
          max-width: 250px;
          min-width: 250px;
          padding: 5px;
          justify-content: center;
        }

        .pet-card-pic img {
          width: 220px;
          height: 180px;
          object-fit: cover;
          justify-content: center;
          margin: 5px 8px;
        }

        .pet-card-details {
          justify-content: center;
          padding: 5px 0;
        }

        .pet-card-details h2 {
          font-family: "Popping", sans-serif;
          color: #1C274C;
          text-align: center;
          margin: 5px 0;
          font-size: 20px;
        }

        .pet-card-details p {
          font-family: "Popping", sans-serif;
          color: #1C274C;
          text-align: center;
          font-size: 16px;
        }

        .show-interest-btn {
          display: flex;
          justify-content: center;
        }

        .show-interest-btn button {
          font-family: "Popping", sans-serif;
          font-size: 14px;
          margin: 0;
          border-radius: 100px;
          border: none;
          padding: 8px 15px;
          color: white;
          background-color: #f18040;
        }

        .show-interest-btn button:hover {
          cursor: pointer;
          background-color: white;
          color: #f18040;
          border-color: #f18040;
          border: 1px solid;
        }
      `}</style>
    </div>
  );
};

export default PetsViewer;
