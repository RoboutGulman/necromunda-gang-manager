import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import translationEnglish from "./locales/en/translations.json";
import translationRussian from "./locales/ru/translations.json";

//---Using different namespaces
const resources = {
    en: {
        home: translationEnglish,
    },
    ru: {
        home: translationRussian,
    },
}

i18next
.use(initReactI18next)
.init({
  resources,
  lng:"en", //default language
});

export default i18next;