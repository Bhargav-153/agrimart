import Header from "@/components/Header";
import styles from "./AboutUs.module.css";
import React from "react";
import SubNav from "@/components/SubNav";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <>
      <Header />
      <SubNav />
      <div className={styles.aboutContainer}>
        
        <h1>About Agrimart</h1>
        

        <section className={styles.content}>
          <p>
            Agrimart is your trusted marketplace for agricultural products and
            farming solutions. Our mission is to empower farmers with
            high-quality seeds, crop protection, nutrition, and equipment.
          </p>
          <p>
            We are committed to providing the best products and services to help
            farmers maximize their yield and improve productivity. With a vast
            selection of agricultural supplies, we ensure that every farmer has
            access to reliable and affordable solutions.
          </p>
        </section>

        <section className={styles.mission}>
          <h2>Our Mission</h2>
          <p>
            Our goal is to support sustainable farming by connecting farmers
            with top-notch products and innovative farming techniques. We aim to
            revolutionize the agricultural sector with technology-driven
            solutions that enhance efficiency and profitability.
          </p>
        </section>

        <section className={styles.contact}>
          <h2>Contact Us</h2>
          <p>If you have any inquiries, feel free to reach out to us:</p>
          <ul>
            <li>Email: info@agrimart.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: 123 Farming Street, Agri City</li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
