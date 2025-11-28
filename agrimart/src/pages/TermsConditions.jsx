import React from "react";
import styles from "./TermsConditions.module.css";

const TermsConditions = () => {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>Terms & Conditions</h1>
      <p className={styles.lastUpdated}>
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <p className={styles.text}>
        Welcome to Agrimart. By accessing or using Agrimart’s website,
        mobile application, or services, you agree to the following
        Terms and Conditions. If you do not agree with any part of these
        terms, please do not use the platform.
      </p>

      {/* Section 1 */}
      <h2 className={styles.sectionTitle}>1. Eligibility</h2>
      <p className={styles.text}>
        You must be at least 18 years old, or a registered business entity,
        to use Agrimart. You agree that the information you provide during
        account creation is accurate, complete, and not misleading.
      </p>

      {/* Section 2 */}
      <h2 className={styles.sectionTitle}>2. Account Responsibility</h2>
      <p className={styles.text}>
        You are responsible for maintaining the confidentiality of your login
        credentials and for all activities performed using your account.
        Agrimart is not liable for unauthorized access caused by user negligence.
      </p>

      {/* Section 3 */}
      <h2 className={styles.sectionTitle}>3. Products & Listings</h2>
      <p className={styles.text}>
        Agrimart is a marketplace supporting agricultural products such as seeds,
        fertilizers, tools, and nursery items. Product descriptions, availability,
        pricing, and quality are the responsibility of the sellers.
      </p>

      {/* Section 4 */}
      <h2 className={styles.sectionTitle}>4. Pricing & Taxes</h2>
      <p className={styles.text}>
        Product prices are determined by sellers and may change without notice.
        Buyers are responsible for shipping costs, taxes, and service fees.
        Final pricing is shown at checkout.
      </p>

      {/* Section 5 */}
      <h2 className={styles.sectionTitle}>5. Orders & Payment</h2>
      <p className={styles.text}>
        By placing an order, you accept the listed product price and terms.
        Payments may be made via UPI, debit/credit cards, digital wallets,
        or other methods displayed during checkout. Payment failures do not
        guarantee order placement.
      </p>

      {/* Section 6 */}
      <h2 className={styles.sectionTitle}>6. Delivery & Shipping</h2>
      <p className={styles.text}>
        Delivery times may vary based on product availability, location,
        courier partners, or weather conditions. Agrimart is not responsible
        for shipping delays caused by external providers.
      </p>

      {/* Section 7 */}
      <h2 className={styles.sectionTitle}>7. Returns & Refunds</h2>
      <p className={styles.text}>
        Return and refund policies vary based on product category and seller.
        Agricultural consumables (seeds, fertilizers, pesticides) may not be
        returnable due to safety and regulatory guidelines.
      </p>

      {/* Section 8 */}
      <h2 className={styles.sectionTitle}>8. User Conduct</h2>
      <ul className={styles.list}>
        <li>No fraudulent activity or impersonation</li>
        <li>No abusive or threatening messages</li>
        <li>No misleading agricultural claims</li>
        <li>No selling banned or illegal products</li>
        <li>No uploading copyrighted or stolen materials</li>
      </ul>

      {/* Section 9 */}
      <h2 className={styles.sectionTitle}>9. Intellectual Property</h2>
      <p className={styles.text}>
        All Agrimart content—logos, UI/UX, graphics, trademarks—is owned by Agrimart.
        Copying, reselling, reverse engineering, or redistribution is prohibited
        without written permission.
      </p>

      {/* Section 10 */}
      <h2 className={styles.sectionTitle}>10. Marketplace Disclaimer</h2>
      <p className={styles.text}>
        Agrimart is a marketplace platform. We do not manufacture products or guarantee:
        product performance, crop yield, seller claims, farming results, or misuse
        of agricultural products. Use items responsibly and according to regulations.
      </p>

      {/* Section 11 */}
      <h2 className={styles.sectionTitle}>11. Suspension or Termination</h2>
      <p className={styles.text}>
        Agrimart may suspend or permanently terminate accounts involved in fraud,
        policy violations, harassment, or illegal sales. These actions may occur
        without prior notice.
      </p>

      {/* Section 12 */}
      <h2 className={styles.sectionTitle}>12. Governing Law</h2>
      <p className={styles.text}>
        These terms are governed by Indian law, local agricultural policies,
        and e-commerce regulations. All legal disputes will be handled under
        the relevant jurisdiction in India.
      </p>

      {/* Section 13 */}
      <h2 className={styles.sectionTitle}>13. Changes to Terms</h2>
      <p className={styles.text}>
        Agrimart may update these Terms and Conditions at any time. Continued
        use of the platform indicates your acceptance of any changes.
      </p>

      {/* Section 14 */}
      <h2 className={styles.sectionTitle}>14. Contact Us</h2>
      <p className={styles.text}>
        For questions, complaints, or assistance:
      </p>
      <ul className={styles.list}>
        <li>Email: support@agrimart.com</li>
        <li>WhatsApp/Phone: +91 XXXXX XXXXX</li>
        <li>Website: agrimart.in</li>
      </ul>

      <p className={styles.footerNote}>
        Thank you for using Agrimart. We aim to empower farmers with trusted
        products, tools, and a reliable digital marketplace.
      </p>
    </div>
  );
};

export default TermsConditions;
