import mongoose from "mongoose";
import Faq from "../models/Faq.model.js";
import dotenv from "dotenv";
dotenv.config();

const faqs = [
  {
    question: "How to place an order?",
    answer: "Browse products → Add to cart → Checkout → Make payment.",
  },
  {
    question: "How can I track my order?",
    answer: "Go to My Orders → Select order → Click Track.",
  },
  {
    question: "What payment methods are available?",
    answer: "UPI, Netbanking, Credit/Debit cards, COD (where available).",
  },
  {
    question: "How do I return or request a refund?",
    answer:
      "Open order → Request return → Follow instructions. Refunds processed in 5-7 business days.",
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Faq.deleteMany({});
  await Faq.insertMany(faqs);
  console.log("Seeded faqs");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
