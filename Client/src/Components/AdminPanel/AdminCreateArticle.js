import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../ToastContext';

const AdminCreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
   const { showToast } = useToast(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/treatments', { title, content });
    showToast('Article created!' ,"success");
    setTitle('');
    setContent('');
  };

  return (
    <div>
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Create New Treatment Article</h2>
      <input className='title' type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Article Title" required />
      <textarea className='content' value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
      <button className='submit-btn' type="submit">Create</button>
    </form>

    <style>{`
    .admin-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 2rem;
}

      h2 {
      color: #1C274C;
      }

      .title {
      padding: 10px;
      border-radius: 10px;
      }

      .content {
      padding: 10px;
      border-radius: 10px;
      }

      .submit-btn {
      padding: 10px;
      background-color: #ff6600;
      color: white;
      border-color: #ff6600;
      border: 2px solid;
      border-radius: 10px;
      font-size: 18px;
      }

      .submit-btn:hover {
      color: #ff6600;
      border-color: #ff6600;
      border: 2px solid;
      }

    `}</style>
    </div>
  );
};

export default AdminCreateArticle;