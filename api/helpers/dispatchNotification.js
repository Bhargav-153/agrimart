import Notification from "../models/notification.model.js";
import sendEmail from "../utils/sendEmail.js";
import sendSMS from "../utils/sendSMS.js";

export const dispatchNotification = async (
  { userId, title, message, email, phone, type = "info" },
  { sendEmail: sendEmailFlag = true, sendSMS: sendSMSFlag = false } = {}
) => {
  if (!userId || !title || !message) {
    return;
  }

  try {
    await Notification.create({ userId, title, message, type });

    const tasks = [];

    if (sendEmailFlag && email) {
      tasks.push(sendEmail(email, title, message));
    }

    if (sendSMSFlag && phone) {
      tasks.push(sendSMS(phone, message));
    }

    if (tasks.length) {
      const results = await Promise.allSettled(tasks);
      results
        .filter((result) => result.status === "rejected")
        .forEach((result) =>
          console.error("Notification channel error:", result.reason)
        );
    }
  } catch (error) {
    console.error("Notification dispatch error:", error.message);
  }
};

export default dispatchNotification;

