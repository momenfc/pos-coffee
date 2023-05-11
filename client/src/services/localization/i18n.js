import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';
import ar from './lang/ar';
import en from './lang/en';

if (!localStorage.getItem('i18nextLng')) {
  localStorage.setItem('i18nextLng', 'en');
}

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
