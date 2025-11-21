import mongoose from 'mongoose';

const FaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  feedback: { type: Number, default: 0 }
});

export default mongoose.model('Faq', FaqSchema);