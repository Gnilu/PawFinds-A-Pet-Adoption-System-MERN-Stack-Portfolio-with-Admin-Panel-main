import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '../ToastContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { showToast } = useToast(); 
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({ itemCount: 0, total: 0 });
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setErrorMessage('You need to log in to view your cart.');
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(response.data.items);
      setErrorMessage('');
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage('Your session has expired. Please log in again.');
      } else {
        console.error('Error:', error);
        setErrorMessage('There was an error getting cart items. Please try again.');
      }
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    const handleLoginChange = () => {
      fetchCartItems();
    };
    window.addEventListener('storage', handleLoginChange);
    return () => {
      window.removeEventListener('storage', handleLoginChange);
    };
  }, []);

  useEffect(() => {
    let total = 0;
    let itemCount = selectedItems.length;
    selectedItems.forEach((itemId) => {
      const item = cartItems.find((i) => i.cart_item_id === itemId);
      if (item) {
        const price = parseFloat(item.item_price?.replace(/[^\d.]/g, '') || '0');
        total += (item.quantity || 1) * price;
      }
    });
    setOrderSummary({ itemCount, total });
  }, [selectedItems, cartItems]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const changeQuantity = async (cartItemId, change) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      showToast('You need to log in to change item quantities.', "error");
      return;
    }

    const updatedItems = cartItems.map((item) => {
      if (item.cart_item_id === cartItemId) {
        const newQuantity = (item.quantity || 1) + change;
        if (newQuantity < 1) return item;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedItems);

    try {
      await axios.put(
        `http://localhost:5000/api/cart/${cartItemId}`,
        {
          quantity: updatedItems.find((item) => item.cart_item_id === cartItemId).quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error updating item quantity:', error);
      showToast('Error updating item quantity. Please try again.',"error");
    }
  };

  const removeItem = async (cartItemId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      showToast('You need to log in to remove items from the cart.', "error");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCartItems();
    } catch (error) {
      console.error('Error deleting cart item:', error);
      showToast('Error deleting item. Please try again.', "error");
    }
  };

  const getSelectedItems = () => cartItems.filter((item) => selectedItems.includes(item.cart_item_id));

  const passItemsToCheckout = async () => {
    const selectedItemsDetails = getSelectedItems();
    const token = localStorage.getItem('authToken');

    if (!token) {
      showToast('You need to log in to proceed to checkout.', "error");
      return;
    }

    if (!selectedItemsDetails.length) {
      showToast('Please select items to proceed to checkout.', "error");
      return;
    }

    try {
      await axios.post(
        'https://your-backend.com/api/orders/checkout/transfer-selected',
        {
          selectedCartItemIds: selectedItemsDetails.map((item) => item.cart_item_id),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast('Items transferred to checkout successfully!', "success");
      navigate('/checkout');
    } catch (error) {
      console.error('Error transferring items to checkout:', error);
      showToast('An error occurred while transferring items. Please try again.', "error");
    }
  };

  return (
    <div className="cart-container">
      {isAuthenticated ? (
        <div className="cart-grid">
          {/* Cart Items */}
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr key={item.cart_item_id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.cart_item_id)}
                          onChange={() => handleCheckboxChange(item.cart_item_id)}
                        />
                      </td>
                      <td>
                        <img
                          src={`http://localhost:5000/images/${item.item_image?.replace('pet-image/', '')}`}
                          alt={item.item_name || 'item'}
                          width="60"
                          height="60"
                        />
                      </td>
                      <td>{item.item_name}</td>
                      <td>{item.item_price}</td>
                      <td>
                        <div className="qty-controls">
                          <button onClick={() => changeQuantity(item.cart_item_id, -1)}>-</button>
                          <span>{item.quantity || 1}</span>
                          <button onClick={() => changeQuantity(item.cart_item_id, 1)}>+</button>
                        </div>
                      </td>
                      <td>
                        <button onClick={() => removeItem(item.cart_item_id)}>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-cart">Your cart is empty.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button className="add-item-btn" onClick={() => navigate('/')}>
              Add item
            </button>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <table>
              <tbody>
                <tr>
                  <td>No. of Items</td>
                  <td>{orderSummary.itemCount}</td>
                </tr>
                <tr>
                  <td>Sub Total</td>
                  <td>Rs. {orderSummary.total.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>Rs. 0.00</td>
                </tr>
                <tr>
                  <td className="total-label">Total</td>
                  <td className="total-amount">{orderSummary.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <button onClick={passItemsToCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <p className="cart-error">{errorMessage}</p>
      )}
    </div>
  );
};

export default Cart;
