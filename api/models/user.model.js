import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false, // Make it optional
    default: "", // Add default value
  },
  avatar: {
    type: String,
    default: "",
  },
  // ... other fields
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;