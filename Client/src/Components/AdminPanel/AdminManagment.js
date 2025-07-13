import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './AdminManagement.css';
import { useToast } from '../ToastContext';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
   const { showToast } = useToast(); 
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    role: '',
    email: '',
    password: '',
    phone_no: '',
    address: '',
    user_image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(
        'https://food-delivery-system-for-gather-and-grab-kzp59bwbm.vercel.app/api/auth/admins',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data && response.data.data) {
        setAdmins(response.data.data);
      } else {
        showToast('No admins found or invalid response format.', "error");
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      showToast('Failed to fetch admins. Please try again.', "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, user_image: file });
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'User Name is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.phone_no.trim()) {
      newErrors.phone_no = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone_no)) {
      newErrors.phone_no = 'Phone number must be 10 digits';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.user_image) newErrors.user_image = 'Admin image is required';
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem('authToken');
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      await axios.post(
        'https://food-delivery-system-for-gather-and-grab.vercel.app/api/auth/add-new-admin',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      showToast('Admin added successfully', "success");
      setShowModal(false);
      setFormData({
        first_name: '',
        last_name: '',
        username: '',
        role: '',
        email: '',
        password: '',
        phone_no: '',
        address: '',
        user_image: null,
      });
      setImagePreview(null);
      fetchAdmins();
    } catch (error) {
      console.error('Error adding admin:', error);
      showToast('Failed to add admin. Please try again.', "error");
    }
  };

  const handleRemoveAdmin = async (adminId) => {
    if (window.confirm('Are you sure you want to remove this admin?')) {
      try {
        await axios.delete(
          `https://food-delivery-system-for-gather-and-grab-kzp59bwbm.vercel.app/api/auth/admins/${adminId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        showToast('Admin removed successfully', "success");
        fetchAdmins();
      } catch (error) {
        console.error('Error removing admin:', error);
        showToast('Failed to remove admin. Please try again.', "error");
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h3 className="admin-title">Admin List</h3>
        <div className="admin-grid">
          {admins.map((admin) => (
            <div key={admin.user_id} className="admin-card">
              {admin.user_image && (
                <img src={admin.user_image} alt="Admin" className="admin-image" />
              )}
              <h5 className="admin-name">{admin.first_name} {admin.last_name}</h5>
              <ul className="admin-info">
                <li>First Name: {admin.first_name}</li>
                <li>Last Name: {admin.last_name}</li>
                <li>User Name: {admin.username}</li>
                <li>Role: {admin.role}</li>
                <li>Email: {admin.email}</li>
                <li>Phone Number: {admin.phone_no}</li>
                <li>Address: {admin.address}</li>
              </ul>
              <button className="admin-remove-btn" onClick={() => handleRemoveAdmin(admin.user_id)}>Remove Admin</button>
            </div>
          ))}
        </div>
        <button className="admin-add-btn" onClick={() => setShowModal(true)}>Add a new admin</button>
      </div>

      {showModal && (
      <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={() => setShowModal(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 className="modal-title">Admin Profile</h2>
        <form onSubmit={(e) => e.preventDefault()} className="modal-form">
          <div className="modal-grid">
            <div className="modal-column">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className={errors.first_name ? 'error-input' : ''}
                placeholder="Enter first name"
              />
              {errors.first_name && <p className="error-text">{errors.first_name}</p>}

              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className={errors.last_name ? 'error-input' : ''}
                placeholder="Enter last name"
              />
              {errors.last_name && <p className="error-text">{errors.last_name}</p>}

              <label>User Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={errors.username ? 'error-input' : ''}
                placeholder="Enter username"
              />
              {errors.username && <p className="error-text">{errors.username}</p>}

              <label>Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={errors.role ? 'error-input' : ''}
                placeholder="Enter role"
              />
              {errors.role && <p className="error-text">{errors.role}</p>}

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error-input' : ''}
                placeholder="Enter email"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}

              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'error-input' : ''}
                placeholder="Enter password"
              />
              {errors.password && <p className="error-text">{errors.password}</p>}

              <label>Phone Number</label>
              <input
                type="text"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleInputChange}
                className={errors.phone_no ? 'error-input' : ''}
                placeholder="Enter phone number"
              />
              {errors.phone_no && <p className="error-text">{errors.phone_no}</p>}

              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'error-input' : ''}
                placeholder="Enter address"
              />
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>

            <div className="modal-column">
              <label>Upload Admin Image</label>
              <input
                type="file"
                name="user_image"
                accept="image/*"
                onChange={handleImageChange}
                className={errors.user_image ? 'error-input' : ''}
              />
              {errors.user_image && <p className="error-text">{errors.user_image}</p>}
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="modal-image-preview" />
              )}
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn-submit" onClick={handleSubmit}>Submit</button>
            <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
    )}
    </div>
  );
};

export default AdminManagement;
