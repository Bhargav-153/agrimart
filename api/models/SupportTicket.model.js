import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant", "agent"],
      default: "user",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const SupportTicketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    orderId: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["order", "product", "payment", "account", "general"],
      default: "general",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      default: "web",
    },
    conversation: {
      type: [ConversationSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SupportTicket", SupportTicketSchema);

