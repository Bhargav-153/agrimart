import mongoose from "mongoose";

const seedSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    unit: { type: String, enum: ["kg", "g", "piece", "packet"], default: "kg" },
    category: { type: String, required: true }, // Grain, Vegetable, Fruit etc.
    tag: { type: String }, // Bestseller, Organic, New, Premium
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: {
      type: Number,
      min: 0,
      default: 0,
    },
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Seed", seedSchema);
