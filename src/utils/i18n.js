import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enLang from "./locales/en.json";
import bgLang from "./locales/bg.json";

const resources = {
  en: {
    translation: enLang
  },
  bg: {
    translation: bgLang
  }
};

const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: savedLanguage, 
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;