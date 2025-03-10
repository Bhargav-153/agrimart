import styles from "./ContactUs.module.css";
import React from "react";
import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
    return (
        <>
            <Header />
            <SubNav />
            <div className={styles.contactContainer}>
                <header className={styles.header}>
                    <h1>Contact Us</h1>
                </header>

                <section className={styles.contactInfo}>
                    <p>If you have any inquiries, feel free to reach out to us:</p>
                    <ul>
                        <li className={styles.contactItem}><FaPhone /> +91 98765 43210</li>
                        <li className={styles.contactItem}><FaEnvelope /> info@agrimart.com</li>
                        <li className={styles.contactItem}><FaMapMarkerAlt /> 123 Farming Street, Agri City</li>
                    </ul>
                </section>

                <section className={styles.contactForm}>
                    <h2>Send Us a Message</h2>
                    <form>
                        <div className={styles.formGroup}>
                            <label>Name</label>
                            <input type="text" placeholder="Enter your name" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <input type="email" placeholder="Enter your email" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Message</label>
                            <textarea placeholder="Enter your message" required></textarea>
                        </div>
                        <button type="submit" className={styles.submitButton}>Send Message</button>
                    </form>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
