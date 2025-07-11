const Treatment = require("../Model/Treatments");

// GET all treatments
exports.getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find().sort({ created_at: -1 });
    res.json(treatments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching treatments", error: err.message });
  }
};

// GET single treatment by ID
exports.getTreatmentById = async (req, res) => {
  try {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment) {
      return res.status(404).json({ message: "Treatment not found" });
    }
    res.json(treatment);
  } catch (err) {
    res.status(500).json({ message: "Error fetching treatment", error: err.message });
  }
};

// Optional: POST (if you want to add treatments manually)
exports.createTreatment = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    const newTreatment = new Treatment({ title, content });
    await newTreatment.save();
    res.status(201).json(newTreatment);
  } catch (err) {
    res.status(500).json({ message: "Error creating treatment", error: err.message });
  }
};
