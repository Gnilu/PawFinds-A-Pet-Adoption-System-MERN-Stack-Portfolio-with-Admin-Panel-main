import React from 'react';
import { Link } from 'react-router-dom';
import './Treatment.css';

const TreatmentCard = ({ article }) => (
  <div className="treatment-card">
    <h3>{article.title}</h3>
    <p>{article.content.substring(0, 100)}...</p>
    <Link to={`/treatment/${article._id}`}>Read More</Link>
  </div>
);

export default TreatmentCard;