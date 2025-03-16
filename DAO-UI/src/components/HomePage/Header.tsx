import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import styles from "@/styles/components/Header.module.css";
import WalletButton from '../Wallet/WalletButton';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { account, active, activate } = useWeb3React<Web3Provider>();
  const location = useLocation();

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.container}>
          <nav className={styles.nav}>
            <Link to="/" className={styles.logoContainer}>
              <img src="/images/logo.svg" alt="DAO VC Logo" className={styles.logo} style={{ width: '40px', height: '40px' }} />
            </Link>

            <div className={styles.navLinks}>
              <Link 
                to="/" 
                className={`${styles.navLink} ${isActiveRoute('/') ? styles.active : ''}`}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/projects" 
                className={`${styles.navLink} ${isActiveRoute('/projects') ? styles.active : ''}`}
              >
                {t('nav.projects')}
              </Link>
              <Link 
                to="/staking" 
                className={`${styles.navLink} ${isActiveRoute('/staking') ? styles.active : ''}`}
              >
                {t('nav.staking')}
              </Link>
              <Link 
                to="/about" 
                className={`${styles.navLink} ${isActiveRoute('/about') ? styles.active : ''}`}
              >
                {t('nav.about')}
              </Link>
            </div>

            <div className={styles.actions}>
              <LanguageSwitcher />
              <WalletButton />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;