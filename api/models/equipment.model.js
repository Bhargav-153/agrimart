import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tag: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Equipment = mongoose.model("Equipment", equipmentSchema);
export default Equipment;
