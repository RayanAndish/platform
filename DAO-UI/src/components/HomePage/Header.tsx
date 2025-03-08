import React from "react";
import { useTranslation } from "react-i18next";
import styles from "styles/components/Header.module.css";

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="Logo" />
        <h1>{t("header.title")}</h1>
      </div>
      <nav className={styles.nav}>
        <a href="/">{t("header.home")}</a>
        <a href="/projects">{t("header.projects")}</a>
        <a href="/about">{t("header.about")}</a>
      </nav>
    </header>
  );
};

export default Header;