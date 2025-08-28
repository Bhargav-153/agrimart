import mongoose from "mongoose";

const organicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tag: { type: String, enum: ["Fertilizer", "Pesticide", "Compost", "Other"] },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Organic", organicSchema);
