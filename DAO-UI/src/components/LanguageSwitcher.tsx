import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "@/styles/components/LanguageSwitcher.module.css";

const languages = [
  { code: "en", name: "English", flag: "/images/icons/en.svg", dir: "ltr" },
  { code: "fa", name: "فارسی", flag: "/images/icons/fa.svg", dir: "rtl" },
  { code: "ar", name: "العربية", flag: "/images/icons/ar.svg", dir: "rtl" },
  { code: "de", name: "Deutsch", flag: "/images/icons/de.svg", dir: "ltr" },
  { code: "ru", name: "Русский", flag: "/images/icons/ru.svg", dir: "ltr" },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  // یافتن زبان فعلی از لیست زبان‌ها
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={styles.currentLanguage}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLanguage.name}
      </button>
      {isOpen && (
        <div className={styles.languageList}>
          {languages.map(language => (
            <button
              key={language.code}
              className={`${styles.languageOption} ${language.code === currentLanguage.code ? styles.active : ''}`}
              onClick={() => handleLanguageChange(language.code)}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;