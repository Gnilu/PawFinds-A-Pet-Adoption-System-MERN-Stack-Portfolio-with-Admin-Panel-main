const express = require('express');
const router = express.Router();

const {
  getCredentials,
  getAllUsers,
  deleteUser
} = require('../Controller/AdminController');

const { getDashboardSummary } = require('../Controller/adminDashboardController');

// Static admin credentials (for testing)
router.get('/credentials', getCredentials);

// Get all users with role 'user'
router.get('/users', getAllUsers);

// Delete user by ID
router.delete('/users/:id', deleteUser);

// Dashboard summary API
router.get('/dashboard-summary', getDashboardSummary);

module.exports = router;
