import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

const normalizePhone = (value = "") => {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("+")) {
    return trimmed;
  }

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+91${digits}`;
  }

  return `+${digits}`;
};

async function sendSMS(phone, message) {
  if (!client) {
    console.warn("Twilio credentials are missing; SMS will not be sent.");
    return;
  }

  if (!fromNumber) {
    console.warn(
      "TWILIO_PHONE_NUMBER is not configured; SMS will not be sent."
    );
    return;
  }

  if (!phone || !message) {
    console.warn("Missing phone or message for SMS dispatch.");
    return;
  }

  try {
    const destination = normalizePhone(phone);

    const response = await client.messages.create({
      body: message,
      from: fromNumber,
      to: destination,
    });

    console.log("SMS Response SID:", response.sid);
    console.log("SMS Sent to:", destination);
  } catch (err) {
    console.error("SMS Error:", err.message);
  }
}

export default sendSMS;
