import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../ToastContext';

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast(); 
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChanges = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.username.trim()) errors.username = 'Username is required';
    if (!formData.password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showToast("Form submission failed due to validation errors", "error");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );
      console.log("Login response:", response.data);

      if (response.status === 200) {
        showToast("Login Successful!", "success");

        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('username', response.data.username);

        setTimeout(() => {
          if (['admin', 'super admin'].includes(response.data.role)) {
            navigate('/admin');
          } else if (response.data.role === 'user') {
            navigate('/');
          }
        }, 1000);
      }
    } catch (err) {
      console.log("Login error:", err.response ? err.response.data : err);
      showToast("Login failed. Invalid username or password.", "error");
    }
  };

  return (
    <section style={styles.loginSection}>
      <div style={styles.loginCard}>
        <h3 style={styles.heading}>Login!</h3>
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChanges}
            placeholder="Username"
            style={styles.input}
            required
          />
          {errors.username && (
            <div style={styles.errorText}>{errors.username}</div>
          )}

          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={handleChanges}
              placeholder="Password"
              style={styles.input}
              required
            />
            <button
              type="button"
              style={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          {errors.password && (
            <div style={styles.errorText}>{errors.password}</div>
          )}

          <button type="submit" style={styles.submitButton}>Login</button>

          <p style={styles.signupText}>
            Not a member?{' '}
            <Link to="/user-account" style={styles.signupLink}>
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

const styles = {
  loginSection: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', backgroundColor: '#f9f9f9', padding: '20px' },
  loginCard: { maxWidth: '400px', width: '100%', padding: '30px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  heading: { textAlign: 'center', marginBottom: '20px' },
  input: { width: '100%', padding: '10px 14px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '8px', fontSize: '14px' },
  passwordWrapper: { position: 'relative' },
  eyeButton: { position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' },
  submitButton: { width: '100%', backgroundColor: '#ffa54f', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', marginTop: '15px', fontSize: '15px' },
  signupText: { textAlign: 'center', marginTop: '15px', fontSize: '14px' },
  signupLink: { color: '#ffa54f', textDecoration: 'none', fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: '12px' }
};

export default Login;
