import express from "express";
import Cart from "../models/Cart.model.js";

const router = express.Router();

// 🧩 Get Cart by User ID
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      // Create empty cart if it doesn't exist
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    res.status(200).json({ items: cart.items || [] });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
});

// 🧩 Add Item to Cart
router.post("/add", async (req, res) => {
  const { userId, product } = req.body;

  try {
    if (!userId || !product) {
      return res.status(400).json({ message: "UserId and product are required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({ userId, items: [] });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === product.productId
    );

    if (existingItemIndex >= 0) {
      // If product exists, increment quantity
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // If product doesn't exist, add new item
      cart.items.push({
        productId: product.productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    await cart.save();
    res.status(200).json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
});

// 🧩 Remove one item from cart
router.delete("/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ message: "Error removing item", error: err.message });
  }
});

// 🧩 Clear entire cart
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();
    res.status(200).json({ items: [] });
  } catch (err) {
    res.status(500).json({ message: "Error clearing cart", error: err.message });
  }
});

export default router;
