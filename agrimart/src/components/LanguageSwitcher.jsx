import React from "react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaGlobe } from "react-icons/fa";
import styles from "./LanguageSwitcher.module.css";

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
];

const LanguageSwitcher = ({ variant = "default" }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  if (variant === "button") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className={styles.buttonTrigger}>
          <FaGlobe className={styles.icon} />
          <span className={styles.buttonText}>{currentLanguage.nativeName}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className={styles.dropdownContent}
          style={{ zIndex: 9999 }}
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`${styles.menuItem} ${
                i18n.language === lang.code ? styles.active : ""
              }`}
            >
              <span className={styles.langName}>{lang.nativeName}</span>
              <span className={styles.langCode}>({lang.name})</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Default variant for header
  return (
    <div className={styles.languageSwitcher}>
      <DropdownMenu>
        <DropdownMenuTrigger className={styles.trigger}>
          <FaGlobe className={styles.icon} />
          <span className={styles.text}>{currentLanguage.nativeName}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className={styles.dropdownContent}
          style={{ zIndex: 9999 }}
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`${styles.menuItem} ${
                i18n.language === lang.code ? styles.active : ""
              }`}
            >
              <span className={styles.langName}>{lang.nativeName}</span>
              <span className={styles.langCode}>({lang.name})</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;

