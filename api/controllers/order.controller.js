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

    // Fetch user details for email/name if not provided in request
    const user = await User.findById(userId).lean();
    let notificationEmail = email || user?.email;
    const userName = user?.name;

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

    // Website notification (short) + Email (detailed template only for email)
    const emailTitle = "Order Confirmation";
    const emailMessage = `Hi ${
      userName || "customer"
    },\n\nThank you for shopping with Agrimart!\n\nYour order (${
      order.orderId
    }) has been successfully placed.\nTotal Amount: ₹${totalAmount}\n\nWe will notify you when your items are packed and shipped.\n\nThank you for choosing Agrimart to support your farming journey.\n\nWarm regards,\nAgrimart Team`;

    await dispatchNotification(
      {
        userId,
        title,
        // short message for website notifications
        message,
        email: notificationEmail,
        type: "order",
        emailTitle,
        emailMessage,
      },
      { sendEmail: true }
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
