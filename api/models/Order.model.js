import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: String, required: true, unique: true },
  items: [
    {
      _id: false,
      productId: { type: mongoose.Schema.Types.ObjectId },
      name: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 },
      unit: String,
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  address: {
    name: String,
    mobile: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "ONLINE"],
    default: "COD",
  },
  paymentGateway: {
    type: String,
    enum: ["gpay", "phonepe", "paytm", "razorpay", null],
    default: null,
  },
  orderDate: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
