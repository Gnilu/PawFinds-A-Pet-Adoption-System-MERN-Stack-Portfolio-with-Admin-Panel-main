// Controller/AdminController.js
const User = require('../Model/User');

// Return static admin credentials (for testing only)
const getCredentials = (req, res) => {
  const credentials = { username: 'admin', password: '123' };
  res.status(200).json(credentials);
};

// ✅ Get all users with role: 'user' (i.e., regular users)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};

// ✅ Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
};

module.exports = {
  getCredentials,
  getAllUsers,
  deleteUser,
};
