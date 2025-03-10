// src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import fa from './fa.json';
import ar from './ar.json';
import de from './de.json';
import ru from './ru.json';

// پیکربندی زبان‌ها
const resources = {
  en: { translation: en },
  fa: { translation: fa },
  ar: { translation: ar },
  de: { translation: de },
  ru: { translation: ru },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fa', 'ar', 'de', 'ru'],
    
    // تنظیمات تشخیص زبان
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },

    // تنظیمات درج متغیرها
    interpolation: {
      escapeValue: false,
    },

    // تنظیمات RTL
    react: {
      useSuspense: true,
    },
  });

// تنظیم جهت متن بر اساس زبان
const setDocumentDirection = (lng: string) => {
  const dir = lng === 'fa' || lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
};

// گوش دادن به تغییرات زبان
i18n.on('languageChanged', (lng) => {
  setDocumentDirection(lng);
});

// تنظیم جهت اولیه
setDocumentDirection(i18n.language);

export default i18n;