const express = require("express");
const router = express.Router();

const auth = require("../Middleware/authMiddleware");
const petController = require("../Controller/addPetController");

router.post("/", auth, petController.addPet);
router.get("/", auth, petController.getPets);

module.exports = router;
