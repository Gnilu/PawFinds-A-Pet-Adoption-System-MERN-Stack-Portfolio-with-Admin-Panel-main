const express = require('express');
const router = express.Router();
const upload = require('../Middleware/upload');
const {
  addNewItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
} = require('../Controller/item-controller');

// Create item
router.post('/add', upload.single('image'), addNewItem);  // <-- 'image' here

// Get all items
router.get('/', getAllItems);

// Get item by ID
router.get('/:id', getItemById);

// Update item
router.put('/:id', upload.single('image'), updateItem);  // <-- 'image' here too

// Delete item
router.delete('/:id', deleteItem);

module.exports = router;
