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
import './AdminItemManagement.css'; // Custom styling

const Items = () => {
  const [items, setItems] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState('');
  const [addFormdata, setAddFormData] = useState({
    item_name: '',
    item_description: '',
    item_price: '',
    category_name: '',
    item_image: '',
  });
  const [errors, setErrors] = useState({});

  const columns = [
    {
      name: 'Item Name',
      selector: (row) => row.item_name,
      width: '200px',
    },
    {
      name: 'Item Description',
      selector: (row) => row.item_description,
      grow: 3,
    },
    {
      name: 'Price (Rs)',
      selector: (row) => row.item_price,
      width: '100px',
    },
    {
      name: 'Category',
      selector: (row) => row.category_name,
      width: '100px',
    },
    {
      name: 'Item Image',
      selector: (row) => (
        <div className="image-cell">
          <img src={row.item_image} alt={row.item_name} className="item-img" />
        </div>
      ),
      width: '100px',
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-cell">
          <button onClick={() => toggleModal(row.item_id)}>
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button onClick={() => toggleEditModal(row)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button onClick={() => handleDelete(row.item_id)}>
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
      const response = await axios.get(
        'https://food-delivery-system-for-gather-and-grab-kzp59bwbm.vercel.app/api/items',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
      const res = await axios.get(
        `https://food-delivery-system-for-gather-and-grab-kzp59bwbm.vercel.app/api/items/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedItem(res.data);
      setIsViewModalOpen(true);
    } catch (err) {
      console.error(err);
      alert('Failed to load item');
    }
  };

  const toggleEditModal = (item) => {
    setSelectedItem(item);
    setEditedDetails({
      item_name: item.item_name,
      item_description: item.item_description,
      item_price: item.item_price,
      category_name: item.category_name,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

   const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedDetails((prevDetails) => ({
        ...prevDetails,
        item_image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  }
};


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    Object.entries(editedDetails).forEach(([key, val]) =>
      formData.append(key, val)
    );
    if (selectedFile) formData.append('item_image', selectedFile);

    try {
      await axios.put(
        `https://food-delivery-system-for-gather-and-grab.vercel.app/api/items/${selectedItem.item_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Updated successfully!');
      setIsEditModalOpen(false);
      fetchItems();
    } catch (err) {
      console.error(err);
      alert('Update failed.');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(
          `https://food-delivery-system-for-gather-and-grab-kzp59bwbm.vercel.app/api/items/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert('Deleted successfully!');
        setItems(items.filter((i) => i.item_id !== id));
      } catch (err) {
        console.error(err);
        alert('Delete failed.');
      }
    }
  };

  const handleFiles = (e) => {
    const selected = e.target.files[0];
    setFile(URL.createObjectURL(selected));
    setAddFormData({ ...addFormdata, item_image: selected });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({ ...addFormdata, [name]: value });
  };

  const validateAddForm = () => {
    const newErrors = {};
    const requiredFields = [
      'item_name',
      'item_description',
      'item_price',
      'category_name',
      'item_image',
    ];
    requiredFields.forEach((field) => {
      if (!addFormdata[field]) {
        newErrors[field] = `${field.replace('_', ' ')} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addNewItem = async () => {
    if (!validateAddForm()) return;
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    Object.entries(addFormdata).forEach(([key, val]) =>
      formData.append(key, val)
    );

    try {
      await axios.post(
        'https://food-delivery-system-for-gather-and-grab.vercel.app/api/items/add-new-item',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Item added!');
      setAddFormData({
        item_name: '',
        item_description: '',
        item_price: '',
        category_name: '',
        item_image: '',
      });
      setFile('');
      setIsAddModalOpen(false);
      fetchItems();
    } catch (err) {
      console.error('Add item error', err);
    }
  };

  const handleCancel = () => {
    setAddFormData({
      item_name: '',
      item_description: '',
      item_price: '',
      category_name: '',
      item_image: '',
    });
    setFile('');
    setIsAddModalOpen(false);
  };

  const handleFilter = (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = filterItems.filter(
      (item) =>
        item.item_name?.toLowerCase().includes(val) ||
        item.category_name?.toLowerCase().includes(val)
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
        <div className="modal-overlay">
          <div className="modal-box">
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
                { name: 'item_name', label: 'Item Name', type: 'text' },
                { name: 'item_description', label: 'Item Description', type: 'text' },
                { name: 'item_price', label: 'Price (Rs)', type: 'number' },
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
                  {errors[field.name] && <p className="error-text">{errors[field.name]}</p>}
                </div>
              ))}

              {/* Category Dropdown */}
              {/* <div>
                <label>Category</label>
                <select
                  name="category_name"
                  value={addFormdata.category_name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.category_name ? 'error' : ''}`}
                >
                  <option value="">Select Category</option>
                  <option value="pizza">Foods</option>
                  <option value="cake">Cake</option>
                  <option value="beverage">Beverage</option>
                </select>
                {errors.category_name && (
                  <p className="error-text">{errors.category_name}</p>
                )}
              </div> */}

              {/* Actions */}
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" onClick={addNewItem}>
                  Submit
                </button>
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
              src={selectedItem.item_image}
              alt={selectedItem.item_name}
              className="preview-image mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedItem.item_name}</h2>
            <p><strong>Description:</strong> {selectedItem.item_description}</p>
            <p><strong>Price:</strong> Rs {selectedItem.item_price}</p>
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
            <button
              className="close-button"
              onClick={() => setIsEditModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3 className="modal-heading">Edit Item</h3>
            <form onSubmit={handleEditSubmit} className="modal-form">
              <div>
                <label>Item Image</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="form-input" />
                {selectedItem.item_image && (
                  <img src={selectedItem.item_image} alt="Preview" className="preview-image mt-2" />
                )}
              </div>

              {[
                { name: 'item_name', label: 'Item Name' },
                { name: 'item_description', label: 'Description', type: 'textarea' },
                { name: 'item_price', label: 'Price' },
                { name: 'category_name', label: 'Category' },
              ].map((field) => (
                <div key={field.name}>
                  <label>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={editedDetails[field.name]}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={editedDetails[field.name]}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  )}
                </div>
              ))}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsEditModalOpen(false)}
                >
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
