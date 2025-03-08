import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../styles/pages/HomePage.module.css";

const NewsletterSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.newsletterSection}>
      <h2 className={styles.newsletterTitle}>{t("newsletter.title")}</h2>
      <div>
        <input
          type="email"
          placeholder={t("newsletter.placeholder")}
          className={styles.newsletterInput}
        />
        <button className={styles.newsletterButton}>
          {t("newsletter.subscribe")}
        </button>
      </div>
    </section>
  );
};

export default NewsletterSection;