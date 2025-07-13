const Pet = require("../Model/addPet");

exports.addPet = async (req, res) => {
  try {
    const { name, type, age, breed } = req.body;

    const pet = new Pet({
      owner: req.user.userId,
      name,
      type,
      age,
      breed
    });

    await pet.save();
    res.status(201).json({ message: "Pet added successfully", pet });
  } catch (err) {
    console.error("Error adding pet:", err);
    res.status(500).json({ message: "Failed to add pet" });
  }
};

exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json({ pets });
  } catch (err) {
    console.error("Error fetching pets:", err);
    res.status(500).json({ message: "Failed to fetch pets" });
  }
};
