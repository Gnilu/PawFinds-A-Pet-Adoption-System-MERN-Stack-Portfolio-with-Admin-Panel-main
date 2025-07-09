import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TreatmentDetail.css';

const TreatmentDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/treatments/${id}`)
      .then(res => setArticle(res.data));
  }, [id]);

  return article ? (
    <div className="treatment-detail">
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  ) : <p>Loading...</p>;
};

export default TreatmentDetail;