import React, { useState } from 'react';
import AdoptForm from '../AdoptForm/AdoptForm';
import { formatDistanceToNow } from 'date-fns';

const PetsViewer = (props) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const formatTimeAgo = (updatedAt) => {
    const date = new Date(updatedAt);
    return formatDistanceToNow(date, { addSuffix: true });
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
        <p><b>Price:</b> {props.pet.age}</p>
      </div>
      <div className='show-interest-btn'>
        <button onClick={togglePopup}>
          Add To Cart <i className="fa fa-paw"></i>
        </button>
      </div>
      {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <AdoptForm closeForm={togglePopup} pet={props.pet} />
          </div>
          <button onClick={togglePopup} className='close-btn'>
            Close <i className="fa fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default PetsViewer;
