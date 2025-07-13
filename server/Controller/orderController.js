/*const Cart = require("../Model/cart");
const Order = require("../Model/Order");
const mongoose = require("mongoose");

// GET selected items in checkout
exports.getSelectedItemsInCheckout = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user_id: userId }).populate("items.item_id");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const selectedItems = cart.items
      .filter((item) => item.selected)
      .map((item) => ({
        cart_item_id: item._id,
        item_id: item.item_id._id,
        item_name: item.item_id.name,
        item_price: item.item_id.age, // age used as price
        quantity: item.quantity,
        item_image: item.item_id.filename,
      }));

    res.status(200).json({ items: selectedItems });
  } catch (error) {
    console.error("Error getting selected checkout items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE: remove selected item from checkout
exports.removeItemsFromCheckout = async (req, res) => {
  try {
    const { selectedCartItemId } = req.params;
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(selectedCartItemId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    item.selected = false;
    await cart.save();

    res.status(200).json({ message: "Item removed from checkout" });
  } catch (error) {
    console.error("Error removing item from checkout:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET: order summary for selected cart items
exports.getOrderSummary = async (req, res) => {
  try {
    const userId = req.user.userId;
    const selectedIds = JSON.parse(req.query.selectedCartItemIds || "[]");

    if (!selectedIds.length) {
      return res.status(400).json({ message: "No items selected" });
    }

    const cart = await Cart.findOne({ user_id: userId }).populate("items.item_id");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const selectedItems = cart.items.filter((item) =>
      selectedIds.includes(item._id.toString())
    );

    let totalQuantity = 0;
    let totalAmount = 0;

    selectedItems.forEach((item) => {
      const price = parseFloat(item.item_id.age || 0);
      totalQuantity += item.quantity;
      totalAmount += price * item.quantity;
    });

    const discountAmount = totalAmount > 1000 ? totalAmount * 0.1 : 0;
    const finalAmount = totalAmount - discountAmount;

    res.status(200).json({
      totalQuantity,
      totalAmount,
      discountAmount,
      finalAmount,
    });
  } catch (error) {
    console.error("Error calculating order summary:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST: place order
exports.placeOrder = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      address,
      city,
      postal_code,
      phone_number,
      selectedCartItemIds,
      totalAmount,
      discountAmount,
      finalAmount,
    } = req.body;

    const userId = req.user.userId;

    if (
      !first_name ||
      !last_name ||
      !address ||
      !city ||
      !postal_code ||
      !phone_number ||
      !selectedCartItemIds?.length
    ) {
      return res.status(400).json({ message: "Missing required order data" });
    }

    const order = new Order({
      user_id: userId,
      shippingInfo: {
        first_name,
        last_name,
        address,
        city,
        postal_code,
        phone_number,
      },
      items: selectedCartItemIds.map((id) => mongoose.Types.ObjectId(id)),
      totalAmount,
      discountAmount,
      finalAmount,
      status: "Pending",
      createdAt: new Date(),
    });

    await order.save();

    // Mark items as ordered and unselect
    const cart = await Cart.findOne({ user_id: userId });
    cart.items.forEach((item) => {
      if (selectedCartItemIds.includes(item._id.toString())) {
        item.selected = false;
        item.ordered = true;
      }
    });

    await cart.save();

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error" });
  }
};*/
