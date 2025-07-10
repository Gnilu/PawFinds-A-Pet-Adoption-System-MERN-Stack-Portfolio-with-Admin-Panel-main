const express = require("express");
const router = express.Router();
const treatmentController = require("../controllers/treatmentController");

// Public routes
router.get("/", treatmentController.getAllTreatments);
router.get("/:id", treatmentController.getTreatmentById);

// Optional: Create treatment (for admin or seed use)
router.post("/", treatmentController.createTreatment);

module.exports = router;
