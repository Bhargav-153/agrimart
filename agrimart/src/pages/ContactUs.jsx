import styles from "./ContactUs.module.css";
import React, { useState } from "react";
import emailjs from "emailjs-com";

import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    //send to agrimart
    emailjs
      .send(
        "service_pg12nca",
        "template_akvzztn",
        formData,
        "6KwxKBGdkXHlurPMv"
      )
      .then(() => {
        console.log("Message sent Successfully! 📩");

        // 2️⃣ Auto-reply to user (confirmation template)
        return emailjs.send(
          "service_pg12nca",
          "template_g7toiii", // new template you created for auto-reply
          formData,
          "6KwxKBGdkXHlurPMv"
        );
      })
      .then(() => {
        alert("Message sent Successfully! 📩");
      })
      .catch((err) => {
        alert("Failed to send message ❌");
        console.error(err);
      });
  };
  return (
    <>
      <div className={styles.contactContainer}>
        <header className={styles.header}>
          <h1>Contact Us</h1>
        </header>

        <section className={styles.contactInfo}>
          <p>If you have any inquiries, feel free to reach out to us:</p>
          <ul>
            <li className={styles.contactItem}>
              <FaPhone /> +91 9537276545
            </li>
            <li className={styles.contactItem}>
              <FaEnvelope /> agrimart4321@gmail.com
            </li>
            <li className={styles.contactItem}>
              <FaMapMarkerAlt /> Vadodara,Gujarat
            </li>
          </ul>
        </section>

        <section className={styles.contactForm}>
          <h2>Send Us a Message</h2>
          <form onSubmit={sendEmail}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Enter your message"
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default ContactUs;
