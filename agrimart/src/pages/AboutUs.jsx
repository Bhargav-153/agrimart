import styles from "./AboutUs.module.css";
import React from "react";
import { useTranslation } from "react-i18next";


const AboutUs = () => {
  const { t } = useTranslation();
  
  return (
    <>
     
      <div className={styles.aboutContainer}>
        <h1>{t("aboutAgrimart")}</h1>

        <section className={styles.content}>
          <p>
            {t("aboutAgrimartDesc1")}
          </p>
          <p>
            {t("aboutAgrimartDesc2")}
          </p>
        </section>

        <section className={styles.mission}>
          <h2>{t("ourMission")}</h2>
          <p>
            {t("ourMissionDesc")}
          </p>
        </section>

        <section className={styles.contact}>
          <h2>{t("contactUs")}</h2>
          <p>{t("contactUsDesc")}</p>
          <ul>
            <li>{t("email")}: agrimart4321@gmail.com</li>
            <li>{t("phone")}: +91 9537276545</li>
            <li>{t("address")}: Vadodara,Gujarat</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
