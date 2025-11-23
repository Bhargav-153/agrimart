import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: { type: Array, required: true },
    totalAmount: Number,
    paymentId: String,
    orderId: String,
    paymentMethod: String,
    paymentGateway: String,
    status: {
      type: String,
      default: "Paid",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
