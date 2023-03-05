import i18next from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

import translationEn from './translationEn.json';
import translationRu from './translationRu.json';

// i18next.use(LanguageDetector).init({
i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: translationEn,
    },
    ru: {
      translation: translationRu,
    },
  },
});
