import Notification from "../models/notification.model.js";
import sendEmail from "../utils/sendEmail.js";
import sendSMS from "../utils/sendSMS.js";

export const createNotification = async (req, res) => {
  try {
    const { userId, title, message, email, phone } = req.body;

    const note = await Notification.create({ userId, title, message });

    if (email) sendEmail(email, title, message);
    if (phone) sendSMS(phone, message);

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
