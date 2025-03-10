import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaTwitter } from "react-icons/fa";
import styles from "./Footer.module.css";
import React from "react";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div>
                    <h3 className={styles.title}>About Agrimart</h3>
                    <p>Your trusted marketplace for agricultural products and farming solutions.</p>
                </div>
                
                <div>
                    <h3 className={styles.title}>Quick Links</h3>
                    <ul>
                        <li><a href="/" className={styles.link}>Home</a></li>
                        <li><a href="/about" className={styles.link}>About Us</a></li>
                        <li><a href="/contact" className={styles.link}>Contact</a></li>
                        <li><a href="/terms" className={styles.link}>Terms & Conditions</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className={styles.title}>Categories</h3>
                    <ul>
                        <li><a href="/shop/seeds" className={styles.link}>Seeds</a></li>
                        <li><a href="/shop/protection" className={styles.link}>Crop Protection</a></li>
                        <li><a href="/shop/nutrition" className={styles.link}>Crop Nutrition</a></li>
                        <li><a href="/shop/equipment" className={styles.link}>Equipment</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className={styles.title}>Contact Us</h3>
                    <ul>
                        <li className={styles.contactItem}><FaPhone /> +91 98765 43210</li>
                        <li className={styles.contactItem}><FaEnvelope /> info@agrimart.com</li>
                        <li className={styles.contactItem}><FaMapMarkerAlt /> 123 Farming Street, Agri City</li>
                    </ul>
                </div>
            </div>
            
            <div className={styles.footerBottom}>
                <div className={styles.containerBottom}>
                    <p>&copy; 2024 Agrimart. All rights reserved.</p>
                    <div className={styles.socialLinks}>
                        <a href="#" className={styles.socialIcon}><FaFacebook /></a>
                        <a href="#" className={styles.socialIcon}><FaTwitter /></a>
                        <a href="#" className={styles.socialIcon}><FaInstagram /></a>
                        <a href="#" className={styles.socialIcon}><FaLinkedin /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;