import React, { useState } from "react";
import { useSelector } from "react-redux";
import Notifications from "../Notification";
import styles from "./NotificationSettings.module.css";

const NotificationSettings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const { user } = useSelector((state) => state.user);

  return (
    <section className={styles.section}>
      <div className={styles.preferences}>
        <h3 className={styles.heading}>Notification Settings</h3>
        <p className={styles.subheading}>
          Decide how you’d like to hear from Agrimart.
        </p>

        <div className={styles.options}>
          <label className={styles.label}>
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={() => setEmailNotif((prev) => !prev)}
              className={styles.checkbox}
            />
            Email Alerts
          </label>

          <label className={styles.label}>
            <input
              type="checkbox"
              checked={smsNotif}
              onChange={() => setSmsNotif((prev) => !prev)}
              className={styles.checkbox}
            />
            SMS Alerts
          </label>
        </div>
      </div>

      <div className={styles.listWrapper}>
        <Notifications userId={user?._id} />
      </div>
    </section>
  );
};

export default NotificationSettings;
