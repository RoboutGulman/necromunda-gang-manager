import i18next from "i18next";
import { initReactI18next } from "react-i18next";

//Import all translation files
import homeEnglish from "./locales/en/home.json";
import homeRussian from "./locales/ru/home.json";
import fighterEnglish from "./locales/en/fighter.json";
import fighterRussian from "./locales/ru/fighter.json";

//---Using different namespaces
const resources = {
    en: {
        home: homeEnglish,
        fighter: fighterEnglish
    },
    ru: {
        home: homeRussian,
        fighter: fighterRussian
    },
}

i18next
.use(initReactI18next)
.init({
  resources,
  lng:"en", //default language
});

export default i18next;