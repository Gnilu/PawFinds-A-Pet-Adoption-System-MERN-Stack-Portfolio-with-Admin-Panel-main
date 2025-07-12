const Pet = require('../Model/Pet');

// Add new pet (no image)
exports.postPetRequest = async (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type } = req.body;

    const pet = await Pet.create({
      name,
      age,
      area,
      justification,
      email,
      phone,
      type,
      filename: '', // 🐾 No image, so empty
      status: 'Pending'
    });

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve pet
exports.approveRequest = async (req, res) => {
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

// Delete pet
exports.deletePost = async (req, res) => {
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

// Get all pets by status
exports.allPets = async (status, req, res) => {
  try {
    const pets = await Pet.find({ status });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
