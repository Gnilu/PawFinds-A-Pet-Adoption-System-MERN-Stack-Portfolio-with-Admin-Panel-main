import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Checkout.css';
import { useToast } from './ToastContext';


const Checkout = () => {
  const [selectedCartItemIds, setSelectedCartItemIds] = useState([]);
  const { showToast } = useToast();
  const [cartId, setCartId] = useState(null);
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState({});
  const [checkoutError, setCheckoutError] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    postal_code: '',
    phone_number: '',
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('authToken');

  // Helper: parse price string like "Rs.1,900.00" into number 1900.00
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    // Remove non-numeric except dot
    const num = Number(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  useEffect(() => {
    if (token) {
      fetchSelectedItems();
    } else {
      setCheckoutError('Authentication required. Please log in again.');
    }
  }, [token]);

  const fetchSelectedItems = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/checkout/selected-items',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        const data = response.data;
        setItems(data.items || []);
        setCartId(data.items?.[0]?.cart_id || null);
        const ids = data.items.map((item) => item.cart_item_id);
        setSelectedCartItemIds(ids);
        fetchOrderSummary(ids);
      } else {
        setCheckoutError('Failed to load items.');
      }
    } catch (error) {
      setCheckoutError('Error fetching items.');
    }
  };

  const fetchOrderSummary = async (cartItemIds) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/order-summary',
        { selectedCartItemIds: cartItemIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setSummary(response.data || {});
      } else {
        setCheckoutError('Failed to load summary.');
      }
    } catch (error) {
      setCheckoutError('Error fetching summary.');
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/checkout/remove-items-from-checkout/${cartItemId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) fetchSelectedItems();
    } catch (error) {
      setCheckoutError('Error removing item.');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'Required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Required';
    if (!formData.address.trim()) newErrors.address = 'Required';
    if (!formData.city.trim()) newErrors.city = 'Required';

    if (!/^[0-9]{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = '10-digit number required';
    }

    if (!/^[0-9]{5}$/.test(formData.postal_code)) {
      newErrors.postal_code = '5-digit number required';
    }

    return newErrors;
  };

  const handleCheckout = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/orders/place',
        {
          ...formData,
          selectedCartItemIds,
          cart_id: cartId,
          totalAmount: summary.totalAmount || 0,
          discountAmount: summary.discountAmount || 0,
          finalAmount: summary.finalAmount || 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        showToast('Order placed successfully!', "success");
        setIsModalOpen(false);
        fetchSelectedItems(); // refresh items after order
      }
    } catch (error) {
      setCheckoutError('Checkout failed.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <>
      <div className="checkout-container">
        <div className="checkout-grid">
          <div className="checkout-table-container">
            <table className="checkout-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.cart_item_id}>
                    <td>
                      <img
                        src={`http://localhost:5000/images/${item.item_image?.replace('pet-image/', '')}`}
                        alt={item.item_name}
                        className="item-image"
                      />
                    </td>
                    <td>{item.item_name}</td>
                    <td>{item.quantity}</td>
                    <td>Rs.{(parsePrice(item.item_price) * item.quantity).toFixed(2)}</td>
                    <td>
                      <button className="remove-button" onClick={() => removeItem(item.cart_item_id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 

          <div className="summary-box">
            <h3 className="order-summary-heading">Order Summary</h3>
            <table>
              <tbody>
                <tr>
                  <td>No. of Items</td>
                  <td>{summary.totalQuantity || 0}</td>
                </tr>
                <tr>
                  <td>Sub Total</td>
                  <td>Rs.{(summary.totalAmount || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>Rs.{(summary.discountAmount || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>Rs.{(summary.finalAmount || 0).toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
            <button onClick={() => setIsModalOpen(true)} className="summary-button">Add Shipping Details</button>
          </div>
        </div>

        <div className="back-btn-container">
          <Link to="/cart" className="back-button">Back</Link>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-box">
              <button onClick={() => setIsModalOpen(false)} className="modal-close-btn">
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <h1>Shipping Information</h1>
              <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleInputChange} />
              {errors.first_name && <p className="error">{errors.first_name}</p>}

              <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleInputChange} />
              {errors.last_name && <p className="error">{errors.last_name}</p>}

              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} />
              {errors.address && <p className="error">{errors.address}</p>}

              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
              {errors.city && <p className="error">{errors.city}</p>}

              <input type="text" name="postal_code" placeholder="Postal Code" value={formData.postal_code} onChange={handleInputChange} />
              {errors.postal_code && <p className="error">{errors.postal_code}</p>}

              <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleInputChange} />
              {errors.phone_number && <p className="error">{errors.phone_number}</p>}

              <button onClick={handleCheckout} className="summary-button">Proceed to Payment</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
