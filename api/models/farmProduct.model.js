import mongoose from "mongoose";

const farmerProductSchema = new mongoose.Schema({

  productName: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: String,
    required: true,
    trim: true,
  },
  unit: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  productImage: {
    type: String,
    required: true,
    trim: true
  },
  
});

const FarmerProduct = mongoose.model("FarmerProduct", farmerProductSchema, "farmerProducts");
export default FarmerProduct;
  