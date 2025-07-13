import React from 'react';

const FailedMsg = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="failed-msg-overlay">
      <div className="failed-msg-modal">
        <h1 className="failed-msg-title">{title}</h1>
        <p className="failed-msg-message">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="failed-msg-close-btn"
        >
          Close
        </button>
      </div>

      <style>{`
      .failed-msg-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
}

.failed-msg-modal {
  background-color: white;
  color: red;
  border-radius: 12px;
  padding: 1.5rem;
  width: 16rem;
  height: 11rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

@media (min-width: 640px) {
  .failed-msg-modal {
    width: 24rem;
  }
}

.failed-msg-title {
  font-size: 1.125rem;
  font-weight: bold;
}

@media (min-width: 640px) {
  .failed-msg-title {
    font-size: 1.25rem;
  }
}

.failed-msg-message {
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

@media (min-width: 640px) {
  .failed-msg-message {
    font-size: 0.875rem;
  }
}

.failed-msg-close-btn {
  margin-top: 1rem;
  background-color: #ffa54f;
  border: 1px solid #ffa54f;
  color: black;
  font-weight: semibold;
  border-radius: 10px;
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

@media (min-width: 640px) {
  .failed-msg-close-btn {
    font-size: 1.125rem;
  }
}

.failed-msg-close-btn:hover {
  background-color: transparent;
  color: black;
  border: 2px solid #ffa54f;
}

      `}</style>
    </div>
  );
};

export default FailedMsg;