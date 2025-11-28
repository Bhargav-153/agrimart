import React from "react";
import { useTranslation } from "react-i18next";
import { languageOptions } from "@/constants/languages";
import styles from "./LanguageSettings.module.css";

const LanguageSettings = () => {
  const { i18n, t } = useTranslation();

  const handleSelect = (code) => {
    if (code !== i18n.language) {
      i18n.changeLanguage(code);
    }
  };

  return (
    <div className={styles.container}>
       <section className={styles.languageSection}>
      <div className={styles.languageHeader}>
        <h3>{t("selectLanguage")}</h3>
        <p>{t("chooseLanguage")}</p>
      </div>

      <div className={styles.languageGrid}>
        {languageOptions.map((language) => {
          const isActive = i18n.language === language.code;

          return (
            <button
              key={language.code}
              type="button"
              className={`${styles.languageCard} ${isActive ? styles.active : ""}`}
              onClick={() => handleSelect(language.code)}
            >
              <div className={styles.cardHeader}>
                <span className={styles.nativeName}>{language.nativeName}</span>
                {isActive && (
                  <span className={styles.currentBadge}>{t("currentLanguageLabel")}</span>
                )}
              </div>
              <div className={styles.cardBody}>
                <p className={styles.languageName}>{language.name}</p>
                <p className={styles.languageDescription}>{t(language.descriptionKey)}</p>
              </div>
              {!isActive && <span className={styles.switchHint}>{t("tapToSwitch")}</span>}
            </button>
          );
        })}
      </div>
    </section>
    </div>
   
  );
};

export default LanguageSettings;

