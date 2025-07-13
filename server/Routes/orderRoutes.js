const express = require("express");
const orderController = require("../Controller/order-controller");
console.log("Order controller functions:", Object.keys(orderController));

// ✅ Import only protect middleware (admin check removed)
const protect = require("../Middleware/authMiddleware");

const router = express.Router();

// ✅ Checkout: Transfer selected items
router.post("/checkout/transfer-selected", protect, orderController.transferSelectedItemsToCheckout);

// ✅ Checkout: Fetch selected items
router.get("/checkout/selected-items", protect, orderController.getSelectedItemsInCheckout);

// ✅ Checkout: Remove items from checkout
router.post("/checkout/remove-items-from-checkout/:selectedCartItemId", protect, orderController.removeItemsFromCheckout);

// ✅ Order Summary (POST)
router.post("/order-summary", protect, orderController.calculateOrderSummary);

// ✅ Order Summary (GET - optional, stub exists in controller)
router.get("/order-summary", protect, orderController.getOrderSummary);

// ✅ Place Order
router.post("/place", protect, orderController.placeOrder);

// ✅ Fetch user orders
router.get("/user-orders", protect, orderController.getUserOrders);

// ✅ Fetch order details by ID
router.get("/order-details/:orderId", protect, orderController.getOrderDetails);

// ✅ Admin: Get all orders
router.get("/admin/orders", protect, orderController.getAllOrders);

// ✅ Admin: Get order statistics (total, pending, etc.)
router.get("/admin/statistics", protect, orderController.getOrderStatistics);

// ✅ Weekly Order Summary for Charts
router.get("/weekly-order-summary", protect, orderController.getWeeklyOrderSummary);

// ✅ Admin: Get order status percentages
router.get("/admin/order-status-percentages", protect, orderController.getOrderStatusPercentages);

// ✅ Admin: Update order status
router.put("/admin/order-status/:orderId", protect, orderController.updateOrderStatus);

// ✅ Admin: Delete order (soft delete)
router.delete("/admin/delete/:orderId", protect, orderController.deleteOrder);

module.exports = router;
