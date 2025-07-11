const Cart = require("../Model/Cart");

exports.addItemToCart = async (req, res) => {
  const { item_id } = req.body;
  const user_id = req.user.user_id;

  if (!item_id || !user_id) {
    return res.status(400).json({ message: "Item ID and User ID are required." });
  }

  try {
    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      cart = new Cart({ user_id, items: [{ item_id, quantity: 1 }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.item_id.toString() === item_id);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ item_id, quantity: 1 });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Item added/updated in cart successfully." });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to add item", error: error.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const cart = await Cart.findOne({ user_id }).populate("items.item_id");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "No items in cart." });
    }

    res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  const cartItemId = req.params.cartItemId;
  const { quantity } = req.body;
  const user_id = req.user.user_id;

  if (!cartItemId || !quantity || quantity < 1) {
    return res.status(400).json({ message: "Valid cartItemId and quantity required." });
  }

  try {
    const cart = await Cart.findOne({ user_id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    const item = cart.items.id(cartItemId);
    if (!item) return res.status(404).json({ message: "Cart item not found." });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Cart item updated successfully." });
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  const cartItemId = req.params.cartItemId;
  const user_id = req.user.user_id;

  try {
    const cart = await Cart.findOne({ user_id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    cart.items.id(cartItemId).remove();
    await cart.save();

    res.status(200).json({ message: "Item removed from cart successfully." });
  } catch (error) {
    console.error("Error deleting item:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
