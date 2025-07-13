const Order = require("../Model/Order");
const Cart = require("../Model/Cart");
const Pet = require('../Model/Pet');
const mongoose = require("mongoose");

// Utility function to parse price strings like "Rs.1,900.00" to number 1900.00
function parsePrice(priceStr) {
  if (!priceStr) return 0;
  // Remove non-numeric except dot (removes Rs. and commas)
  const num = Number(priceStr.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : num;
}

// Transfer selected cart items to checkout (mark selected items in cart)
exports.transferSelectedItemsToCheckout = async (req, res) => {
  const { selectedCartItemIds } = req.body;
  const userId = req.user.userId;

  if (!Array.isArray(selectedCartItemIds) || selectedCartItemIds.length === 0) {
    return res.status(400).json({ error: "No items selected for checkout" });
  }

  try {
    const cart = await Cart.findOne({ user_id: new mongoose.Types.ObjectId(userId) });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Mark selected items in cart
    cart.items.forEach((item) => {
      item.selected = selectedCartItemIds.includes(item._id.toString());
    });

    await cart.save();

    // Fetch selected items with pet details
    const selectedItems = [];
    for (const item of cart.items) {
      if (item.selected) {
        const pet = await Pet.findById(item.item_id);
        if (pet) {
          selectedItems.push({
            cart_item_id: item._id,
            quantity: item.quantity,
            item_id: pet._id,
            item_name: pet.name,
            item_price: pet.age, // still string here, frontend should handle display
            item_image: pet.filename 
          });
        }
      }
    }

    if (selectedItems.length === 0) {
      return res.status(404).json({
        error: "Selected items not found in the cart.",
      });
    }

    res.status(200).json({ items: selectedItems });
  } catch (error) {
    console.error("Error in transferSelectedItemsToCheckout:", error);
    res.status(500).json({ error: "Failed to transfer selected items" });
  }
};

// Get selected items in checkout
exports.getSelectedItemsInCheckout = async (req, res) => {
  const userId = req.user.userId;
  try {
    const cart = await Cart.findOne({ user_id: new mongoose.Types.ObjectId(userId) });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const selectedItems = [];
    for (const item of cart.items) {
      if (item.selected) {
        const pet = await Pet.findById(item.item_id);
        if (pet) {
          selectedItems.push({
            cart_item_id: item._id,
            quantity: item.quantity,
            item_id: pet._id,
            item_name: pet.name,
            item_price: pet.age,
            item_image: pet.filename 
          });
        }
      }
    }

    if (selectedItems.length === 0) {
      return res.status(404).json({ error: "No selected items found in checkout." });
    }

    res.json({ items: selectedItems });
  } catch (error) {
    console.error("Error fetching selected items:", error);
    res.status(500).json({ error: "Failed to fetch selected items." });
  }
};

// Remove item from checkout (unselect)
exports.removeItemsFromCheckout = async (req, res) => {
  const selectedCartItemId = req.params.selectedCartItemId;
  const userId = req.user.userId;

  if (!selectedCartItemId) {
    return res.status(400).json({ message: "No item provided for removal." });
  }

  try {
    const cart = await Cart.findOne({ user_id: new mongoose.Types.ObjectId(userId) });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.id(selectedCartItemId);
    if (!item || !item.selected) {
      return res.status(404).json({ message: "Selected item not found" });
    }

    item.selected = false;
    await cart.save();

    res.status(200).json({
      message: "Item removed from checkout and marked as unselected.",
    });
  } catch (error) {
    console.error("Error removing item from checkout:", error);
    res.status(500).json({ message: "Failed to remove item from checkout." });
  }
};

// Calculate order summary for selected items
exports.calculateOrderSummary = async (req, res) => {
  const { selectedCartItemIds } = req.body;
  const userId = req.user.userId;

  if (!Array.isArray(selectedCartItemIds) || selectedCartItemIds.length === 0) {
    return res.status(400).json({ error: "No items selected" });
  }

  try {
    const cart = await Cart.findOne({ user_id: new mongoose.Types.ObjectId(userId) });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    let totalAmount = 0;
    let totalQuantity = 0;

    for (const id of selectedCartItemIds) {
      const item = cart.items.id(id);
      if (!item) continue;

      const pet = await Pet.findById(item.item_id);
      if (!pet) continue;

      const price = parsePrice(pet.age);
      const quantity = item.quantity || 1;

      totalAmount += price * quantity;
      totalQuantity += quantity;
    }

    // No discount for now
    const discountAmount = 0;
    const finalAmount = totalAmount - discountAmount;

    res.json({ totalAmount, discountAmount, finalAmount, totalQuantity });
  } catch (error) {
    console.error("Error calculating order summary:", error);
    res.status(500).json({ error: "Failed to calculate order summary" });
  }
};

// Place an order
exports.placeOrder = async (req, res) => {
  const {
    selectedCartItemIds,
    first_name,
    last_name,
    address,
    city,
    postal_code,
    phone_number,
  } = req.body;
  const userId = req.user.userId;

  if (
    !Array.isArray(selectedCartItemIds) ||
    selectedCartItemIds.length === 0 ||
    !first_name ||
    !last_name ||
    !address ||
    !city ||
    !postal_code ||
    !phone_number
  ) {
    return res.status(400).json({ error: "Missing order or delivery details" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ user_id: new mongoose.Types.ObjectId(userId) }).session(session);
    if (!cart) throw new Error("Cart not found");

    // Filter selected items
    const orderItems = [];
    for (const id of selectedCartItemIds) {
      const item = cart.items.id(id);
      if (!item) continue;

      const pet = await Pet.findById(item.item_id).session(session);
      if (!pet) continue;

      orderItems.push({
        item_id: pet._id,
        item_name: pet.name,
        item_price: parsePrice(pet.age),
        quantity: item.quantity,
      });
    }

    if (orderItems.length === 0)
      throw new Error("Selected items not found in cart");

    // Calculate totals
    let totalAmount = 0;
    orderItems.forEach(({ item_price, quantity }) => {
      totalAmount += item_price * quantity;
    });

    const discount = 0;
    const finalAmount = totalAmount - discount;

    // Create order document
    const order = new Order({
      user_id: userId,
      cart_id: cart._id,
      order_status: "Pending",
      total_amount: totalAmount,
      discount,
      final_amount: finalAmount,
      order_items: orderItems,
      delivery_details: {
        first_name,
        last_name,
        address,
        city,
        postal_code,
        phone_number,
      },
    });

    await order.save({ session });

    // Remove ordered items from cart
    cart.items = cart.items.filter(
      (item) => !selectedCartItemIds.includes(item._id.toString())
    );
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Order placed successfully",
      orderId: order._id,
      totalAmount,
      discountAmount: discount,
      finalAmount,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};

// Get orders for user
exports.getUserOrders = async (req, res) => {
  const userId = req.user.userId;
  try {
    const orders = await Order.find({ user_id: new mongoose.Types.ObjectId(userId), is_deleted: false })
      .sort({ order_date: -1 })
      .exec();

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get order details by ID
exports.getOrderDetails = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).exec();
    if (!order || order.is_deleted) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: "Failed to fetch order details" });
  }
};

// Admin: Get all orders with items summarized
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ is_deleted: false })
      .select("order_items final_amount order_status order_date user_id")
      .populate("user_id", "email")
      .sort({ order_date: -1 })
      .exec();

    const formattedOrders = orders.map((order) => ({
      order_id: order._id,
      item_names: order.order_items.map((i) => i.item_name).join(", "),
      total_final_price: order.final_amount,
      order_status: order.order_status,
      order_date: order.order_date,
      user_email: order.user_id?.email || "",
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { newStatus } = req.body;

  try {
    const order = await Order.findById(orderId).populate("user_id", "email");
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.order_status = newStatus;
    await order.save();

    res.json({ message: "Order status updated." });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};

// Delete order (soft delete)
exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.is_deleted = true;
    await order.save();

    res.json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order" });
  }
};

// Stub functions for undefined routes to avoid route errors
exports.getOrderSummary = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
exports.getOrderStatistics = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
exports.getWeeklyOrderSummary = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
exports.getOrderStatusPercentages = async (req, res) => {
  res.status(501).json({ message: "Not implemented" });
};
