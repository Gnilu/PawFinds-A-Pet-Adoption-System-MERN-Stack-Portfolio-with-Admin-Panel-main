const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");

router.use(auth);

router.post("/add", cartController.addItemToCart);
router.get("/", cartController.getCartItems);
router.put("/:cartItemId", cartController.updateCartItem);
router.delete("/:cartItemId", cartController.deleteCartItem);

module.exports = router;
