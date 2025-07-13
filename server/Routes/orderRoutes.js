/*const express = require("express");
const orderController = require("../Controller/orderController");
const { protect, adminOrSuperAdmin } = require("../Middleware/authMiddleware");
const router = express.Router();

// Transfer selected items to checkout (optional, your frontend may not call this)
router.post("/checkout/transfer-selected", protect, orderController.transferSelectedItemsToCheckout);

// Fetch selected items in checkout
router.get("/checkout/selected-items", protect, orderController.getSelectedItemsInCheckout);

// Remove item from checkout by cart item id
router.post(
  "/checkout/remove-items-from-checkout/:selectedCartItemId",
  protect,
  orderController.removeItemsFromCheckout
);

// Place an order
router.post("/place", protect, orderController.placeOrder);

// Get order summary for selected items (GET with query param)
router.get("/order-summary", protect, orderController.getOrderSummary);

// Admin and other routes omitted for brevity...

module.exports = router;*/
