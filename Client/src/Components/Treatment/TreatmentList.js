import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TreatmentCard from './TreatmentCard';
import './Treatment.css';

const TreatmentList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/treatments')
      .then(res => setArticles(res.data));
  }, []);

  return (
    <div className="treatment-list">
      {articles.map(article => (
        <TreatmentCard key={article._id} article={article} />
      ))}
    </div>
  );
};

export default TreatmentList;