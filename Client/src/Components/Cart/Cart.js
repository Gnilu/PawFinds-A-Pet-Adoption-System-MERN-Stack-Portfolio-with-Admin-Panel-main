import React from 'react';
import './CartPage.css'; // Linked style file

const cartItems = [
  {
    id: 1,
    name: 'Buddy',
    image: '/assets/dog1.jpg',
    category: 'Dog',
    quantity: 1,
    price: 40.0,
  },
  {
    id: 2,
    name: 'Mittens',
    image: '/assets/cat1.jpg',
    category: 'Cat',
    quantity: 2,
    price: 25.0,
  },
];

export default function CartPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2 className="cart-title">Cart</h2>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p>{item.category}</p>
              <div className="cart-item-bottom">
                <span>Qty: {item.quantity}</span>
                <span className="price">${item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}
