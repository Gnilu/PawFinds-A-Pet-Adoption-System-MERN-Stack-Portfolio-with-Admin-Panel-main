const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const multer = require('multer');

// For file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/user-image'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/admin', upload.single('user_image'), authController.addAdmin);
router.get('/admins', authController.getAllAdmins);
router.delete('/admin/:user_id', authController.deleteAdmin);

router.get('/users', authController.getAllUsers);

module.exports = router;
