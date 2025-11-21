import express from 'express';
import { getFaqs, addFaq, submitFeedback } from '../controllers/faq.controller.js';

const router = express.Router();

router.get('/', getFaqs);
router.post('/', addFaq); // protect this with auth in production
router.post('/:id/feedback', submitFeedback);

export default router;