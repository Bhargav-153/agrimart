import Notification from "../models/notification.model.js";
import sendEmail from "../utils/sendEmail.js";

export const dispatchNotification = async (
  {
    userId,
    title,
    message,
    email,
    type = "info",
    // optional separate values for email
    emailTitle,
    emailMessage,
  },
  { sendEmail: sendEmailFlag = true } = {}
) => {
  if (!userId || !title || !message) {
    console.warn("dispatchNotification: missing required fields", {
      userId,
      title,
      hasMessage: !!message,
    });
    return;
  }

  try {
    console.log(
      `dispatchNotification: saving notification for user ${userId} type=${type}`
    );
    // 1. Save website notification (short message)
    await Notification.create({ userId, title, message, type });

    // 2. Email Notification Only (use emailMessage/emailTitle if provided)
    if (sendEmailFlag) {
      if (!email) {
        console.warn(
          "dispatchNotification: sendEmailFlag true but no email provided for user",
          userId
        );
      } else {
        const mailTitle = emailTitle || title;
        const mailMessage = emailMessage || message;
        console.log("dispatchNotification: sending email to", email);
        await sendEmail(email, mailTitle, mailMessage);
      }
    } else {
      console.log(
        "dispatchNotification: sendEmailFlag is false, skipping email send"
      );
    }
  } catch (error) {
    console.error("Notification dispatch error:", error?.message || error);
  }
};

export default dispatchNotification;
