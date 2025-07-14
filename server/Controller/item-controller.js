const Item = require('../Model/Item');
const fs = require('fs');
const path = require('path');

// CREATE
const addNewItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file?.filename;

    if (!name || !price || !image) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newItem = new Item({
      name,
      price,
      image: `/images/pet-image/${image}`
    });

    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (err) {
    console.error('Add item error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// READ ALL
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// READ ONE
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (err) {
    console.error('Fetch by ID error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE
const updateItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    let updateFields = { name, price };

    if (req.file) {
      updateFields.image = `/images/pet-image/${req.file.filename}`;
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updateFields, {
      new: true
    });

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE
const deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Delete the image file from the server
    if (deleted.image) {
      const imagePath = path.join(__dirname, '..', 'public', deleted.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Image delete failed:', err);
      });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addNewItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};
