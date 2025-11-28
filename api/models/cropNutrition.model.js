import mongoose from "mongoose";

const cropNutritionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: Number,
    category: String,
    tag: String,
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("CropNutrition", cropNutritionSchema);
