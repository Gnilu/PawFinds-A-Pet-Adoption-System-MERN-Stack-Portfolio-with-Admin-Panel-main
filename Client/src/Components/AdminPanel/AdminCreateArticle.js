import React, { useState } from 'react';
import axios from 'axios';
import './AdminCreateArticle.css';

const AdminCreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/treatments', { title, content });
    alert('Article created!');
    setTitle('');
    setContent('');
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Create New Treatment Article</h2>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
      <button type="submit">Create</button>
    </form>
  );
};

export default AdminCreateArticle;