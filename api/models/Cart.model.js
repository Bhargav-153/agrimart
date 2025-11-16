import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      _id: false,
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Seed" }, // or Product
      name: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
