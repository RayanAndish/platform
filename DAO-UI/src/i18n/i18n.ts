// src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';  // Import LanguageDetector
import en from './en.json';
import fa from './fa.json';
import ar from './ar.json';
import de from './de.json';
import ru from './ru.json';

i18n
  .use(LanguageDetector) // Use LanguageDetector
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      de: { translation: de },
      ru: { translation: ru },
      fa: { translation: fa },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes the values
    },
    detection: {
      order: ['localStorage', 'navigator'], // Detect language from local storage or browser
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;