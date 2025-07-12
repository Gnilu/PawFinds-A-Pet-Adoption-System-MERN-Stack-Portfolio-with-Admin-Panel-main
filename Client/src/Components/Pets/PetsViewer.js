import React from 'react';
import { useNavigate } from 'react-router-dom';

const PetsViewer = (props) => {
  const navigate = useNavigate();

  return (
    <div className='pet-view-card'>
      <div className='pet-card-pic'>
        <img src={`http://localhost:5000/images/${props.pet.filename}`} alt={props.pet.name} />
      </div>
      <div className='pet-card-details'>
        <p> {props.pet.type}</p>
        <p><b>Price:</b> {props.pet.age}</p>
        <p><b>Location:</b> {props.pet.area}</p>
      </div>
      <div className='show-interest-btn'>
        <button onClick={() => navigate('/cart')}>Add To Cart<i className="fa fa-paw"></i></button>
      </div>

     <style>{`
     .pet-view-card {
    display: flex;
    flex-direction: column;
    margin: 10px 10px;
    border: 1px solid;
    border-radius: 15px;
    width: 310px;
    height: auto;
    background-color: white;
}

.pet-card-pic {
    max-width: 250px;
    min-width: 250px;
    padding: 5px;
}

.pet-card-pic img {
    width: 220px;
    height: 180px;
    object-fit: cover;
}

.pet-card-details {
    padding: 5px 10px;
}
 
.pet-card-details h2 {
    font-family: "Varela Round", sans-serif;
    color: #1C274C;
    text-align: center;
    margin: 5px 0;
}

.pet-card-details p {
    font-family: "Varela Round", sans-serif;
    color: #1C274C;
}

.show-interest-btn {
    display: flex;
    justify-content: center;
}

.show-interest-btn button {
    font-family: "Varela Round", sans-serif;
    font-size: 14px;
    margin: 10px 0;
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
