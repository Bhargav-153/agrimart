import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import hi from "./hi.json";
import gu from "./gu.json";

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem("i18nextLng") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      gu: { translation: gu },
    },
    lng: savedLanguage,   // use saved language or default
    fallbackLng: "en",    // if key missing in selected lang
    interpolation: {
      escapeValue: false, // react already protects from XSS
    },
  });

// Save language preference to localStorage whenever it changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
});

export default i18n;
