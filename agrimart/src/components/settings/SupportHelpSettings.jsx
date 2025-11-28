import React from "react";
import { Link } from "react-router-dom";
import styles from "./SupportHelpSettings.module.css";
import {
  FiPhoneCall,
  FiHelpCircle,
  FiMessageCircle,
  FiFileText,
} from "react-icons/fi";
import {
  RouteChatbot,
  RouteFAQ,
  RouteSupport,
  RouteTickets,
} from "@/helpers/RouteName";

const SupportHelpSettings = () => {
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.title}>
          <FiHelpCircle className={styles.iconHead} />
          Support & Help
        </h3>

        <p className={styles.subtitle}>
          Need help? We're here to assist you with orders, products, payments, and more.
        </p>
        <div className={styles.links}>
         <Link to={RouteFAQ} className={styles.linkItem}>
            <FiFileText className={styles.linkIcon} />
            Frequently Asked Questions (FAQ)
          </Link>

       
          <Link to={RouteSupport} className={styles.linkItem}>
            <FiPhoneCall className={styles.linkIcon} />
            Contact Support
          </Link>

         

          <Link to={RouteChatbot} className={styles.linkItem}>
            <FiMessageCircle className={styles.linkIcon} />
            AI Assistant (Chat with Agrimart bot)
          </Link>

          <Link to={RouteTickets} className={styles.linkItem}>
            📝 Raise a Support Ticket
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SupportHelpSettings;
