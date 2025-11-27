import FarmerProduct from "../models/farmerProduct.model.js";
import Order from "../models/Order.model.js";
import User from "../models/user.model.js";
import { dispatchNotification } from "../helpers/dispatchNotification.js";

const generateOrderId = () =>
  `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export const placeOrder = async (req, res) => {
  try {
    const { userId, items = [], totalAmount, address, paymentMethod, paymentGateway } = req.body;

    if (!userId || !items.length || !totalAmount) {
      return res.status(400).json({ success: false, message: "Missing order details" });
    }

    // 🔥 Ensure every item has an image (fetch from DB if not provided)
    const normalizedItems = await Promise.all(
      items.map(async (item) => {
        let image = item.image;

        // If image missing → fetch from database
        if (!image && item.productId) {
          const product = await FarmerProduct.findById(item.productId).lean();
          if (product && product.image) {
            image = product.image; // base64 from DB
          }
        }

        return {
          productId: item.productId || item._id,
          name: item.name,
          price: item.price,
          image: image || "",    // final guaranteed image
          quantity: item.quantity || 1,
          unit: item.unit || "unit",
        };
      })
    );

    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const order = await Order.create({
      userId,
      orderId: generateOrderId(),
      items: normalizedItems,
      totalAmount,
      address: address || null,
      paymentMethod: paymentMethod || "COD",
      paymentGateway: paymentGateway || null,
    });

    res.json({ success: true, order, message: "Order placed successfully" });
  } catch (err) {
    console.error("Place order error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
