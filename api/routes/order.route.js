import express from "express";
import Order from "../models/Order.model.js";
import { placeOrder } from "../controllers/order.controller.js";


const router = express.Router();
router.post("/place", placeOrder);

// CREATE ORDER (Buy Now)
router.post("/create", async (req, res) => {
  const { userId, product, address, paymentMethod, paymentGateway } = req.body;

  if (!userId || !product) {
    return res.status(400).json({ message: "Missing user or product data" });
  }

  try {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const newOrder = new Order({
      userId,
      orderId,
      items: [
        {
          productId: product.productId || product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          unit: product.unit || "unit",
        }
      ],
      totalAmount: product.price,
      status: "Pending",
      address: address || null,
      paymentMethod: paymentMethod || "COD",
      paymentGateway: paymentGateway || null,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
});


// GET ORDERS BY USER
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

export default router;
