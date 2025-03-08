import React from "react";
import { useTranslation } from "react-i18next";
import styles from "styles/components/Footer.module.css";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.aboutSection}>
        <h3>{t("footer.aboutTitle")}</h3>
        <p>{t("footer.aboutDescription")}</p>
      </div>

      <div className={styles.linksSection}>
        <h3>{t("footer.linksTitle")}</h3>
        <a href="/">{t("footer.home")}</a>
        <a href="/projects">{t("footer.projects")}</a>
        <a href="/terms">{t("footer.terms")}</a>
        <a href="/documentation">{t("footer.documentation")}</a>
      </div>

      <div className={styles.socialsSection}>
        <h3>{t("footer.socialsTitle")}</h3>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>

      <p className={styles.copyright}>
        {t("footer.copyright")} &copy; {new Date().getFullYear()} Rayan DAO.
      </p>
    </footer>
  );
};

export default Footer;