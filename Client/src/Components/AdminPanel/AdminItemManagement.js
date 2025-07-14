// src/pages/Items.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faTrash,
  faPenToSquare,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import './AdminItemManagement.css';
import { useToast } from '../ToastContext';

const Items = () => {
  const [items, setItems] = useState([]);
  const { showToast } = useToast();
  const [filterItems, setFilterItems] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState('');
  const [addFormdata, setAddFormData] = useState({
    name: '',
    price: '',
    image: '',
  });
  const [errors, setErrors] = useState({});

  const columns = [
    {
      name: 'Item Name',
      selector: (row) => row.name,
      width: '200px',
    },
    {
      name: 'Price (Rs)',
      selector: (row) => row.price,
      width: '100px',
    },
    {
      name: 'Item Image',
      selector: (row) => (
        <div className="image-cell">
           <img src={`http://localhost:5000/images/items/${row.image}`} alt={row.name} className="item-img" />
        </div>
      ),
      width: '100px',
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-cell">
          <button onClick={() => toggleModal(row._id)}>
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button onClick={() => toggleEditModal(row)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button onClick={() => handleDelete(row._id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
      width: '100px',
    },
  ];

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: '#2d2d2d',
        color: 'white',
        fontSize: '16px',
        border: 'solid 1px gray',
        fontWeight: '500',
        letterSpacing: '0.02rem',
      },
    },
    rows: {
      style: {
        backgroundColor: '#2d2d2d',
        color: 'white',
        border: 'solid 1px gray',
        fontWeight: '200',
        letterSpacing: '0.03rem',
      },
    },
    cells: {
      style: {
        borderRight: 'solid 1px gray',
        borderLeft: 'solid 1px gray',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#2d2d2d',
        color: 'white',
      },
      pageButtonsStyle: {
        fill: 'white !important',
      },
    },
  };

  const fetchItems = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get('http://localhost:5000/api/items', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data);
      setFilterItems(response.data);
    } catch (err) {
      console.error('Error fetching items', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const toggleModal = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      const res = await axios.get(`http://localhost:5000/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedItem(res.data);
      setIsViewModalOpen(true);
    } catch (err) {
      console.error(err);
      showToast('Failed to load item', 'error');
    }
  };

  const toggleEditModal = (item) => {
    setSelectedItem(item);
    setEditedDetails({
      name: item.name,
      price: item.price,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('name', editedDetails.name);
    formData.append('price', editedDetails.price);
    if (selectedFile) formData.append('image', selectedFile);

    try {
      await axios.put(
        `http://localhost:5000/api/items/${selectedItem._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      showToast('Updated successfully!', 'success');
      setIsEditModalOpen(false);
      fetchItems();
    } catch (err) {
      console.error(err);
      showToast('Update failed.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`http://localhost:5000/api/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showToast('Deleted successfully!', 'success');
        setItems(items.filter((i) => i._id !== id));
      } catch (err) {
        console.error(err);
        showToast('Delete failed.', 'error');
      }
    }
  };

  const handleFiles = (e) => {
    const selected = e.target.files[0];
    setFile(URL.createObjectURL(selected));
    setAddFormData({ ...addFormdata, image: selected });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({ ...addFormdata, [name]: value });
  };

  const validateAddForm = () => {
    const newErrors = {};
    ['name', 'price', 'image'].forEach((field) => {
      if (!addFormdata[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addNewItem = async () => {
    if (!validateAddForm()) return;
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('name', addFormdata.name);
    formData.append('price', addFormdata.price);
    formData.append('image', addFormdata.image);

    try {
      await axios.post('http://localhost:5000/api/items/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      showToast('Item added!', 'success');
      setAddFormData({ name: '', price: '', image: '' });
      setFile('');
      setIsAddModalOpen(false);
      fetchItems();
    } catch (err) {
      console.error('Add item error', err);
    }
  };

  const handleCancel = () => {
    setAddFormData({ name: '', price: '', image: '' });
    setFile('');
    setIsAddModalOpen(false);
  };

  const handleFilter = (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = filterItems.filter((item) =>
      item.name?.toLowerCase().includes(val)
    );
    setItems(filtered);
  };

  return (
    <div className="items-container">
      <div className="modal-container">
        <div className="modal-top">
          <button
            type="button"
            className="add-button"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Items +
          </button>
          <div className="search-wrapper">
            <input
              type="search"
              name="search"
              id="search"
              onChange={handleFilter}
              className="search-input"
              placeholder="Search here"
            />
          </div>
        </div>

        <div className="data-table-wrapper">
          <DataTable
            columns={columns}
            data={items}
            fixedHeader
            pagination
            customStyles={customStyle}
          />
        </div>
      </div>

      {/* ADD MODAL */}
      {isAddModalOpen && (
        <div className="Item-modal-overlay">
          <div className="Item-modal-box">
            <button
              className="close-button"
              onClick={() => setIsAddModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3 className="modal-heading">Add New Item</h3>
            <form onSubmit={(e) => e.preventDefault()} className="modal-form">
              <div className="image-input-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  onChange={handleFiles}
                  className="hidden"
                />
                <label htmlFor="fileInput" className="image-label">
                  {file ? (
                    <img src={file} alt="preview" className="preview-image" />
                  ) : (
                    <span>Select an image</span>
                  )}
                </label>
              </div>

              {/* Form Fields */}
              {[
                { name: 'name', label: 'Item Name', type: 'text' },
                { name: 'price', label: 'Price (Rs)', type: 'number' },
              ].map((field) => (
                <div key={field.name}>
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={addFormdata[field.name]}
                    onChange={handleInputChange}
                    className={`form-input ${errors[field.name] ? 'error' : ''}`}
                  />
                  {errors[field.name] && (
                    <p className="error-text">{errors[field.name]}</p>
                  )}
                </div>
              ))}

              <div className="form-right">
                <div className="modal-actions">
                  <button type="submit" className="btn-submit" onClick={addNewItem}>
                    Submit
                  </button>
                  <button type="button" className="btn-cancel" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {isViewModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-box view-box">
            <h3 className="modal-heading">Item Details</h3>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="preview-image mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedItem.name}</h2>
            <p>
              <strong>Price:</strong> Rs {selectedItem.price}
            </p>
            <button className="btn-submit mt-4" onClick={() => setIsViewModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-button" onClick={() => setIsEditModalOpen(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3 className="modal-heading">Edit Item</h3>
            <form onSubmit={handleEditSubmit} className="modal-form">
              <div>
                <label>Item Image</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="form-input" />
                {selectedItem.image && (
                  <img src={selectedItem.image} alt="Preview" className="preview-image mt-2" />
                )}
              </div>

              {[
                { name: 'name', label: 'Item Name' },
                { name: 'price', label: 'Price' },
              ].map((field) => (
                <div key={field.name}>
                  <label>{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={editedDetails[field.name]}
                    onChange={handleEditChange}
                    className="form-input"
                  />
                </div>
              ))}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
