import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import styles from "@/styles/pages/HomePage.module.css";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStakingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(ROUTES.STAKING);
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <span className={styles.gradientText}>{t("hero.title")}</span>
        </h1>
        <p className={styles.heroSubtitle}>{t("hero.subtitle")}</p>
        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={handleStakingClick}
          >
            {t("staking.button")}
          </button>
          <button className={`${styles.button} ${styles.secondaryButton}`}>
            {t("hero.learnMore")}
          </button>
        </div>
      </div>
      <div className={styles.heroVisual}>
        <div className={styles.tokenGlow}></div>
        <div className={styles.chartAnimation}></div>
      </div>
    </section>
  );
};

export default HeroSection;