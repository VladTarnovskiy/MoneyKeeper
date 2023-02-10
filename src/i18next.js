import i18next from 'i18next';

import translationEn from './locales/translationEn.json' assert { type: 'json' };
import translationRu from './locales/translationRu.json' assert { type: 'json' };

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
// i18next.changeLanguage('ru');
