import styles from "./ContactUs.module.css";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";

import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const { t } = useTranslation();
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
        alert(t("messageSentSuccess"));
      })
      .catch((err) => {
        alert(t("messageSentFailed"));
        console.error(err);
      });
  };
  return (
    <>
      <div className={styles.contactContainer}>
        <header className={styles.header}>
          <h1>{t("contactUs")}</h1>
        </header>

        <section className={styles.contactInfo}>
          <p>{t("contactUsDesc")}</p>
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
          <h2>{t("sendUsMessage")}</h2>
          <form onSubmit={sendEmail}>
            <div className={styles.formGroup}>
              <label>{t("fullName")}</label>
              <input
                type="text"
                name="name"
                placeholder={t("enterYourName")}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>{t("email")}</label>
              <input
                type="email"
                name="email"
                placeholder={t("enterYourEmail")}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>{t("message")}</label>
              <textarea
                name="message"
                placeholder={t("enterYourMessage")}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              {t("sendMessage")}
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default ContactUs;
