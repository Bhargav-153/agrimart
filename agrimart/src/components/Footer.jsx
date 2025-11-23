import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import styles from "./Footer.module.css";
import React from "react";
import { useTranslation } from "react-i18next";
import { RouteAboutUs, RouteContactUs } from "../helpers/RouteName";

import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <h3 className={styles.title}>{t("aboutAgrimart")}</h3>
          <p>
            {t("footerAboutDescription")}
          </p>
        </div>

        <div>
          <h3 className={styles.title}>{t("quickLinks")}</h3>
          <ul>
            <li>
              <a href="/" className={styles.link}>
                {t("home")}
              </a>
            </li>
            <li>
              <Link to={RouteAboutUs} className={styles.link}>
                {t("aboutUs")}
              </Link>
            </li>
            <li>
              <Link to={RouteContactUs} className={styles.link}>
                {t("contact")}
              </Link>
            </li>
            <li>
              <a href="/terms" className={styles.link}>
                {t("termsAndConditions")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={styles.title}>{t("categories")}</h3>
          <ul>
            <li>
              <a href="/shop/seeds" className={styles.link}>
                {t("seeds")}
              </a>
            </li>
            <li>
              <a href="/shop/protection" className={styles.link}>
                {t("cropProtection")}
              </a>
            </li>
            <li>
              <a href="/shop/nutrition" className={styles.link}>
                {t("cropNutrition")}
              </a>
            </li>
            <li>
              <a href="/shop/equipment" className={styles.link}>
                {t("equipment")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={styles.title}>{t("contactUs")}</h3>
          <ul>
            <li className={styles.contactItem}>
              <FaPhone /> +91 95372 76545
            </li>
            <li className={styles.contactItem}>
              <FaEnvelope /> agrimart4321@gmail.com
            </li>
            <li className={styles.contactItem}>
              <FaMapMarkerAlt /> Vadodara,Gujarat
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.containerBottom}>
          <p>&copy; 2025 Agrimart. {t("allRightsReserved")}</p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon}>
              <FaFacebook />
            </a>
            <a href="#" className={styles.socialIcon}>
              <FaTwitter />
            </a>
            <a href="#" className={styles.socialIcon}>
              <FaInstagram />
            </a>
            <a href="#" className={styles.socialIcon}>
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
