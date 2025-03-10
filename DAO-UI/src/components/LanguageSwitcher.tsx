import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/components/LanguageSwitcher.module.css";

const languages = [
  { code: "en", name: "English", flag: "/images/icons/en.png", dir: "ltr" },
  { code: "fa", name: "فارسی", flag: "/images/icons/fa.png", dir: "rtl" },
  { code: "ar", name: "العربية", flag: "/images/icons/ar.png", dir: "rtl" },
  { code: "de", name: "Deutsch", flag: "/images/icons/de.png", dir: "ltr" },
  { code: "ru", name: "Русский", flag: "/images/icons/ru.png", dir: "ltr" },
];

const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  
  // یافتن زبان فعلی از لیست زبان‌ها
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (language: typeof languages[0]) => {
    i18n.changeLanguage(language.code);
    setIsOpen(false);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button 
        className={styles.dropdownButton} 
        onClick={toggleDropdown}
        aria-label="Select Language"
      >
        <img src={currentLanguage.flag} alt={currentLanguage.name} />
        <span>{currentLanguage.name}</span>
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={`${styles.dropdownItem} ${lang.code === currentLanguage.code ? styles.active : ''}`}
              onClick={() => handleLanguageChange(lang)}
              dir={lang.dir}
            >
              <img src={lang.flag} alt={lang.name} />
              <span>{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;