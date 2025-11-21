import Faq from '../models/Faq.model.js';

export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addFaq = async (req, res) => {
  try {
    const { question, answer, tags } = req.body;
    const faq = new Faq({ question, answer, tags });
    await faq.save();
    res.json(faq);
  } catch (err) {
    res.status(500).json({ message: 'Create failed' });
  }
};

export const submitFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { helpful } = req.body;
    const faq = await Faq.findById(id);
    if (!faq) return res.status(404).json({ message: 'Not found' });
    if (helpful) faq.feedback = (faq.feedback || 0) + 1;
    else faq.feedback = (faq.feedback || 0) - 1;
    await faq.save();
    res.json({ success: true, feedback: faq.feedback });
  } catch (err) {
    res.status(500).json({ message: 'Feedback failed' });
  }
};