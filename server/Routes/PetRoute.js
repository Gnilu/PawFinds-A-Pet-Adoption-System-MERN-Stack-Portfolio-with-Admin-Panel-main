const express = require('express');
const router = express.Router();
const {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets
} = require('../controller/PetController');

// 🐾 No multer or file upload for now
router.get('/requests', (req, res) => allPets('Pending', req, res));
router.get('/approvedPets', (req, res) => allPets('Approved', req, res));
router.get('/adoptedPets', (req, res) => allPets('Adopted', req, res));

router.post('/services', postPetRequest); // ✅ simple POST, no image
router.put('/approving/:id', approveRequest);
router.delete('/delete/:id', deletePost);

module.exports = router;
