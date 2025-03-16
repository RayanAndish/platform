import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '@/styles/components/Footer.module.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* About Section */}
          <div className={styles.aboutSection}>
            <div className={styles.logo}>
              <img src="/images/logo.svg" alt={t('app.name')} style={{ width: '40px', height: '40px' }} />
              <span>{t('app.name')}</span>
            </div>
            <p className={styles.aboutText}>
              {t('footer.aboutDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.sectionTitle}>
              {t('footer.linksTitle')}
            </h3>
            <div className={styles.linksList}>
              <Link to="/" className={styles.link}>
                {t('nav.home')}
              </Link>
              <Link to="/projects" className={styles.link}>
                {t('nav.projects')}
              </Link>
              <Link to="/staking" className={styles.link}>
                {t('nav.staking')}
              </Link>
              <Link to="/voting" className={styles.link}>
                {t('nav.voting')}
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className={styles.socialsSection}>
            <h3 className={styles.sectionTitle}>
              {t('footer.socialsTitle')}
            </h3>
            <div className={styles.socialLinks}>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </a>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.227-.535.227l.19-2.712 4.94-4.465c.215-.19-.047-.296-.332-.106l-6.104 3.853-2.623-.916c-.57-.176-.582-.57.12-.843l10.238-3.952c.475-.176.89.107.606.942z"/>
                </svg>
                Telegram
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Discord
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <div className={styles.copyrightContent}>
            <p className={styles.copyrightText}>
              © {currentYear} {t('app.name')}. {t('footer.copyright')}
            </p>
            <div className={styles.copyrightLinks}>
              <Link to="/terms" className={styles.copyrightLink}>
                {t('footer.terms')}
              </Link>
              <Link to="/privacy" className={styles.copyrightLink}>
                {t('footer.privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;