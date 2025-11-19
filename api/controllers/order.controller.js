import Order from "../models/Order.model.js";
import User from "../models/user.model.js";
import { dispatchNotification } from "../helpers/dispatchNotification.js";

const generateOrderId = () =>
  `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

export const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      items = [],
      totalAmount,
      email,
      phone,
      address,
      paymentMethod,
      paymentGateway,
    } = req.body;

    if (!userId || !items.length || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing order details",
      });
    }

    const normalizedItems = items.map((item) => ({
      productId: item.productId || item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity || 1,
      unit: item.unit || "unit",
    }));

    let notificationEmail = email;
    let notificationPhone = phone;

    if (!notificationEmail || !notificationPhone) {
      const user = await User.findById(userId).lean();
      notificationEmail = notificationEmail || user?.email;
      notificationPhone = notificationPhone || user?.phone;
    }

    const order = await Order.create({
      userId,
      orderId: generateOrderId(),
      items: normalizedItems,
      totalAmount,
      address: address || null,
      paymentMethod: paymentMethod || "COD",
      paymentGateway: paymentGateway || null,
    });

    const title = "Order Placed Successfully";
    const message = `Your Agrimart order (${order.orderId}) has been placed. Total: ₹${totalAmount}.`;

    await dispatchNotification(
      {
        userId,
        title,
        message,
        email: notificationEmail,
        phone: notificationPhone,
        type: "order",
      },
      { sendSMS: true }
    );

    res.json({
      success: true,
      order,
      message: "Order placed. Notifications sent.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
