import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            alert('Form submission failed due to validation errors');
            return;
        }

        try {
            const response = await axios.post(
                'https://food-delivery-system-for-gather-and-grab-kzp59bwbm.vercel.app/api/auth/login',
                formData
            );
            if (response.status === 200) {
                alert('Login Successful!');
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('role', response.data.role);

                if (['admin', 'super admin'].includes(response.data.role)) {
                    navigate('/dashboard');
                } else if (response.data.role === 'user') {
                    navigate('/');
                }
            }
        } catch (err) {
            console.log(err);
            setIsModalOpen(true);
        }
    };

    return (
        <div className="login-container">
            <div className="modal-container">{/* FailedMsg modal */}</div>

            <div className={`login-box ${isModalOpen ? 'blurred' : ''}`}>
                <h1 className="welcome-title">heeee</h1>
                <div className="form-card">
                    <h3 className="form-heading">Login!</h3>
                    <form method="POST" className="login-form" onSubmit={handleSubmit} noValidate>
                        <div className="input-group">
                            <label htmlFor="username" className="input-label">
                                Username
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChanges}
                                    className="input-field"
                                    placeholder="Enter your username"
                                    required
                                />
                                {errors.username && (
                                    <div className="error-text">{errors.username}</div>
                                )}
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password" className="input-label">
                                Password
                            </label>
                            <div className="input-wrapper password-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChanges}
                                    className="input-field"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="eye-button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </button>
                            </div>
                            {errors.password && (
                                <div className="error-text">{errors.password}</div>
                            )}
                        </div>

                        <button type="submit" className="submit-button">
                            Login
                        </button>

                        <p className="signup-link">
                            Not a member?{' '}
                            <Link to="/registration" className="signup-highlight">
                                Signup
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
