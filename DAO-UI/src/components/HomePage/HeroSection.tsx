import React from "react";
import { useTranslation } from "react-i18next";
import styles from "styles/pages/HomePage.module.css";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.heroSection}>
      <h1 className={styles.heroTitle}>{t("hero.title")}</h1>
      <p className={styles.heroSubtitle}>{t("hero.subtitle")}</p>
      <button className={styles.heroButton}>{t("hero.getStarted")}</button>
    </section>
  );
};

export default HeroSection;