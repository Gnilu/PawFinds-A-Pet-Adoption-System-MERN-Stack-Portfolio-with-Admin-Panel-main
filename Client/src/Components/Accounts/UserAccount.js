import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from '../ToastContext';


const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast(); 
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChanges = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showToast("Form submission failed due to validation errors", "errors");
      return;
    }

    try {
      // Use JSON directly since no files involved
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );

      if (response.status === 201) {
        showToast("Registration successful!", "success");
        // Store token if backend sends one (adjust accordingly)
        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
        }
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      showToast("Registration failed" , "error");
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.card}>
        <h3 style={styles.heading}>Signup</h3>
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

          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChanges}
            placeholder="Email"
            style={styles.input}
            required
          />
          {errors.email && <div style={styles.errorText}>{errors.email}</div>}

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

          <div style={styles.passwordWrapper}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChanges}
              placeholder="Confirm Password"
              style={styles.input}
              required
            />
            <button
              type="button"
              style={styles.eyeButton}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          {errors.confirmPassword && (
            <div style={styles.errorText}>{errors.confirmPassword}</div>
          )}

          <button type="submit" style={styles.button}>
            Register
          </button>

          <p style={styles.linkText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

const styles = {
  section: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  card: {
    maxWidth: "400px",
    width: "100%",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    backgroundColor: "#ffa54f",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "15px",
    fontSize: "15px",
  },
  linkText: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#ffa54f",
    textDecoration: "none",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
  },
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  eyeButton: {
    position: "absolute",
    right: "10px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
  },
};

export default Register;