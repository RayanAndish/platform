import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../../styles/pages/HomePage.module.css";
import WalletDashboard from "../Wallet/WalletDashboard";
import LanguageSwitcher from "../LanguageSwitcher";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{t("header.title")}</h1>
          <nav className={styles.nav}>
            <a href="/projects" className={styles.navLink}>
              {t("header.nav.projects")}
            </a>
            <a href="/staking" className={styles.navLink}>
              {t("header.nav.staking")}
            </a>
            <a href="/voting" className={styles.navLink}>
              {t("header.nav.voting")}
            </a>
            <a href="/about" className={styles.navLink}>
              {t("header.nav.about")}
            </a>
            <WalletDashboard />
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.subtitle")}</p>
        </div>

        {/* Statistics Section */}
        <div className={styles.statistics}>
          <div className={styles.statItem}>
            <h2>{t("stats.numbers.projects")}</h2>
            <p>{t("stats.activeProjects")}</p>
          </div>
          <div className={styles.statItem}>
            <h2>{t("stats.numbers.funds")}</h2>
            <p>{t("stats.fundsRaised")}</p>
          </div>
          <div className={styles.statItem}>
            <h2>{t("stats.numbers.members")}</h2>
            <p>{t("stats.communityMembers")}</p>
          </div>
        </div>

        {/* Projects Section */}
        <section className={styles.projectsSection}>
          <h2>{t("projects.title")}</h2>
          <div className={styles.projectsList}>
            <div className={styles.projectCard}>
              <h3>Project 1</h3>
              <p>A short description of Project 1.</p>
              <button>{t("projects.card.learnMore")}</button>
            </div>
            <div className={styles.projectCard}>
              <h3>Project 2</h3>
              <p>A short description of Project 2.</p>
              <button>{t("projects.card.learnMore")}</button>
            </div>
            <div className={styles.projectCard}>
              <h3>Project 3</h3>
              <p>A short description of Project 3.</p>
              <button>{t("projects.card.learnMore")}</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>{t("footer.copyright")}</p>
      </footer>
    </div>
  );
};

export default HomePage;