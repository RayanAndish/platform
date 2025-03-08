import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../styles/pages/HomePage.module.css";

const StatisticsSection: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { label: t("stats.projects"), value: "12,345" },
    { label: t("stats.users"), value: "56,789" },
    { label: t("stats.investments"), value: "$1,234,567" },
  ];

  return (
    <section className={styles.statisticsSection}>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className={styles.statBox}>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;