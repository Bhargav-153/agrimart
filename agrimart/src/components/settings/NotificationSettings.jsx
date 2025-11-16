import React, { useState } from "react";
import styles from "./NotificationSettings.module.css";

const NotificationSettings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <section className={styles.section}>
      <h3 className={styles.heading}>Notification Settings</h3>
      <div className={styles.options}>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
            className={styles.checkbox}
          />
          Email Notifications
        </label>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={smsNotif}
            onChange={() => setSmsNotif(!smsNotif)}
            className={styles.checkbox}
          />
          SMS Notifications
        </label>
      </div>
    </section>
  );
};

export default NotificationSettings;
