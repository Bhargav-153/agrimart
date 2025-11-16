import mongoose from "mongoose";

const nurserySchema = new mongoose.Schema({

  plantName: {
    type: String,
    required: true,
    trim: true,
  },
  plantPrice: {
    type: String,
    required: true,
    trim: true,
  },

  nurseryName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
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
  plantImage: {
    type: String,
    required: true,
    trim: true
  },
  
});

const Nursery = mongoose.model("Nursery", nurserySchema, "nurseries");
export default Nursery;
  