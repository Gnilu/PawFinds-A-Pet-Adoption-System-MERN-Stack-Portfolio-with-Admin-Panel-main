const Pet = require('../Model/Pet'); // Make sure the path is correct

// Submit a new pet request
const postPetRequest = async (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type } = req.body;
    const { filename } = req.file;

    const pet = await Pet.create({
      name,
      age,
      area,
      justification,
      email,
      phone,
      type,
      filename: `pet-image/${filename}`,  // image stored as relative path
      status: 'Pending'
    });

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve a pet request
const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPet = await Pet.findByIdAndUpdate(
      id,
      { status: 'Approved' },
      { new: true }
    );

    if (!updatedPet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a pet post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPet = await Pet.findByIdAndDelete(id);

    if (!deletedPet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pets by status (Pending / Approved / Adopted)
const allPets = async (status, req, res) => {
  try {
    const pets = await Pet.find({ status });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Export all controller functions
module.exports = {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets
};
