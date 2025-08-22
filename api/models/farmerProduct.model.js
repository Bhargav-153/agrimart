import mongoose from "mongoose";

const farmerProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    contact: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    image: { type: String },
    farmerEmail: { type: String, required: true },
    farmer: {
      name: { type: String, required: true },
      location: { type: String, required: true },
    },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
export default mongoose.models.FarmerProduct ||
  mongoose.model("FarmerProduct", farmerProductSchema);
