import React, { useState } from "react";
import "../styles/components/LanguageSwitcher.module.css"; // فایل CSS مربوطه

const languages = [
  { code: "en", name: "English", flag: "/images/icons/en.png" },
  { code: "fa", name: "فارسی", flag: "/images/icons/fa.png" },
  { code: "ar", name: "العربية", flag: "/images/icons/ar.png" },
  { code: "de", name: "Dutch", flag: "/images/icons/de.png" },
  { code: "ru", name: "Russian", flag: "/images/icons/ru.png" },
];

const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (language: typeof languages[0]) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    // تغییر زبان
    console.log(`Language changed to: ${language.code}`);
  };

  return (
    <div className="language-switcher">
      <button className="dropdown-button" onClick={toggleDropdown}>
        <img src={selectedLanguage.flag} alt={selectedLanguage.name} />
        {selectedLanguage.name}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className="dropdown-item"
              onClick={() => handleLanguageChange(lang)}
            >
              <img src={lang.flag} alt={lang.name} />
              {lang.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;