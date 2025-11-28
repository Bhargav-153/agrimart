import Notification from "../models/notification.model.js";
import sendEmail from "../utils/sendEmail.js";

export const createNotification = async (req, res) => {
  try {
    const { userId, title, message, email } = req.body;

    // 1. Save notification in database
    const note = await Notification.create({ userId, title, message });

    // 2. Send email (only if provided)
    if (email) {
      await sendEmail(email, title, message);
    }

    res.json({ success: true, note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const notes = await Notification.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
