import React from "react";
import styles from "../../styles/pages/HomePage.module.css";
import WalletDashboard from "../Wallet/WalletDashboard";
import LanguageSwitcher from "../LanguageSwitcher";

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>DAO VC Funding Platform</h1>
          <nav className={styles.nav}>
            <a href="/projects" className={styles.navLink}>
              Projects
            </a>
            <a href="/staking" className={styles.navLink}>
              Staking
            </a>
            <a href="/voting" className={styles.navLink}>
              Voting
            </a>
            <a href="/about" className={styles.navLink}>
              About
              </a>
             <WalletDashboard /> {/* دکمه اتصال ولت به منوی ناوبری منتقل شد */}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Hero Section */}
        <div className={styles.hero}>
          {/* Buttons on Hero */}
          <div className={styles.heroActions}>
            <LanguageSwitcher />
          </div>
          <h1>Welcome to DAO VC Funding Platform</h1>
          <p>
            Discover, Invest, and Grow with the best blockchain-based projects.
          </p>
        </div>

        {/* Statistics Section */}
        <div className={styles.statistics}>
          <div className={styles.statItem}>
            <h2>25+</h2>
            <p>Active Projects</p>
          </div>
          <div className={styles.statItem}>
            <h2>$10M+</h2>
            <p>Funds Raised</p>
          </div>
          <div className={styles.statItem}>
            <h2>50+</h2>
            <p>Community Members</p>
          </div>
        </div>

        {/* Projects Section */}
        <section className={styles.projectsSection}>
          <h2>Explore Projects</h2>
          <div className={styles.projectsList}>
            <div className={styles.projectCard}>
              <h3>Project 1</h3>
              <p>A short description of Project 1.</p>
              <button>Learn More</button>
            </div>
            <div className={styles.projectCard}>
              <h3>Project 2</h3>
              <p>A short description of Project 2.</p>
              <button>Learn More</button>
            </div>
            <div className={styles.projectCard}>
              <h3>Project 3</h3>
              <p>A short description of Project 3.</p>
              <button>Learn More</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2025 DAO VC Funding Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;