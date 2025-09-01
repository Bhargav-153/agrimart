import mongoose from "mongoose";

const SchemeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: [{ type: String, required: true }],
    icon: { type: String },
    linkApply: { type: String },
    linkYoutube: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Schemes", SchemeSchema);
