const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { postPetRequest, approveRequest, deletePost, allPets } = require('../controller/PetController');

// ✅ Updated storage location
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/pet-image'));  // <-- updated folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Routes
router.get('/requests', (req, res) => allPets('Pending', req, res));
router.get('/approvedPets', (req, res) => allPets('Approved', req, res));
router.get('/adoptedPets', (req, res) => allPets('Adopted', req, res));
router.post('/services', upload.single('picture'), postPetRequest); // Pet submission
router.put('/approving/:id', approveRequest); // Approve pet
router.delete('/delete/:id', deletePost);     // Delete pet

module.exports = router;
