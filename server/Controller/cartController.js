const Cart = require("../Model/cart");
const Pet = require("../Model/Pet");

// Add item to cart
exports.addItemToCart = async (req, res) => {
  const { item_id } = req.body;
  const user_id = req.user.userId; // ✅ FIXED: Match JWT payload key

  if (!item_id || !user_id) {
    return res.status(400).json({ message: "Item ID and User ID are required." });
  }

  try {
    const itemExists = await Pet.findById(item_id);
    if (!itemExists) {
      return res.status(404).json({ message: "Item not found." });
    }

    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      cart = new Cart({
        user_id,
        items: [{ item_id, quantity: 1 }]
      });
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

// Get cart items with populated item info
exports.getCartItems = async (req, res) => {
  try {
    const user_id = req.user.userId; // ✅ FIXED
    const cart = await Cart.findOne({ user_id }).populate("items.item_id");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "No items in cart." });
    }

    const items = cart.items.map((item) => ({
      cart_item_id: item._id,
      quantity: item.quantity,
      item_id: item.item_id._id,
      item_name: item.item_id.name,
      item_price: item.item_id.age,           // price is stored in age
      item_image: item.item_id.filename       // filename is used for image path
    }));

    res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update quantity of a specific cart item
exports.updateCartItem = async (req, res) => {
  const cartItemId = req.params.cartItemId;
  const { quantity } = req.body;
  const user_id = req.user.userId; // ✅ FIXED

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

// Delete item from cart
exports.deleteCartItem = async (req, res) => {
  const cartItemId = req.params.cartItemId;
  const user_id = req.user.userId; // ✅ FIXED

  try {
    const cart = await Cart.findOne({ user_id });
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    const itemIndex = cart.items.findIndex(item => item._id.toString() === cartItemId);
    if (itemIndex === -1) return res.status(404).json({ message: "Cart item not found." });

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: "Item removed from cart successfully." });
  } catch (error) {
    console.error("Error deleting item:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
