import nodemailer from "nodemailer";

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

// Create transporter using Gmail + App Password
let transporter;

try {
  if (emailUser && emailPass) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
    console.log("Email transporter configured using Gmail.");
  } else {
    console.warn("EMAIL_USER or EMAIL_PASS missing. Email will not be sent.");
  }
} catch (err) {
  console.error("Error creating email transporter:", err.message);
}

export default async function sendEmail(to, subject, message) {
  if (!transporter) {
    console.warn("Email transporter not available. Skipping email send.");
    return;
  }

  if (!to) {
    console.warn("No recipient email provided.");
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: emailUser,
      to,
      subject,
      text: message,
    });

    console.log("Email sent →", to, " | Message ID:", info.messageId);
  } catch (err) {
    console.error("Email sending error:", err.message);
  }
}
