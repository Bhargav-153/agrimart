import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.model.js";

export const createOrder = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "AGR-" + Date.now(),
    };

    const order = await instance.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature)
      return res.json({ success: false });

    await Order.create({
      userId: req.body.userId,
      items: req.body.items,
      totalAmount: req.body.amount,
      address: req.body.address,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentMethod: "Online",
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
