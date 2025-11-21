import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();


const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

let transporter;

if (emailUser && emailPass) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
} 

export default async function sendEmail(to, subject, message) {
  if (!transporter) {
    return;
  }

  if (!to) {
    console.warn("Missing recipient email address. Skipping email send.");
    return;
  }

  try {
    await transporter.sendMail({
      from: emailUser,
      to,
      subject,
      text: message,
    });

    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Email error:", err.message);
  }
}
