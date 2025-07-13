import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({ message: '', type: '' });
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast UI */}
      {toast.message && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: toast.type === "success" ? "#4BB543" : "#FF4E42",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          zIndex: 9999,
          fontWeight: "600",
          fontSize: "0.95rem",
          transition: "all 0.3s ease"
        }}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
