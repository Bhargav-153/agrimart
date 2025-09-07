import mongoose from "mongoose";

const cropProtectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    tag: {
      type: String,
      enum: ["Pesticide", "Biological", "Natural", "Eco-friendly", "Herbal", "Organic","Premium"],
      default: "",
    },
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
    image: {
      type: String, // URL/path to uploaded image
      required: [true, "Product image is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("CropProtection", cropProtectionSchema);
