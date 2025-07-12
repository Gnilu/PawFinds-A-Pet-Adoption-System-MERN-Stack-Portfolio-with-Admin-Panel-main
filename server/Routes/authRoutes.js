const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const authMiddleware = require('../Middleware/authMiddleware')
const multer = require('multer');

// For file uploads (if needed later)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/user-image'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes
router.post('/register', authController.register);
router.get("/me", authMiddleware, authController.getProfile);
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers);

// ✅ Admin creation (TEMPORARY: use once to add first admin)
router.post('/create-admin', authController.createAdmin); // ← ADD THIS

module.exports = router;
