import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: {
      type: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId },
          name: { type: String, required: true },
          price: { type: Number, required: true },
          image: { type: String }, // URL or Base64
          quantity: { type: Number, default: 1 },
          unit: { type: String, default: "unit" },
        },
      ],
      required: true,
    },
    totalAmount: { type: Number, required: true },
    orderId: { type: String, required: true, unique: true },
    paymentMethod: { type: String, default: "COD" },
    paymentGateway: { type: String, default: null },
    status: { type: String, default: "Pending" },
    address: { type: Object, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
