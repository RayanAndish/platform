import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/components/About.module.css';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.aboutContainer}>
      <section className={styles.hero}>
        <h1 className={styles.title}>{t('about.title')}</h1>
        <p className={styles.subtitle}>{t('about.subtitle')}</p>
      </section>

      <section className={styles.mission}>
        <h2>{t('about.mission.title')}</h2>
        <p>{t('about.mission.description')}</p>
      </section>

      <section className={styles.features}>
        <h2>{t('about.features.title')}</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌐</div>
            <h3>{t('about.features.decentralized.title')}</h3>
            <p>{t('about.features.decentralized.description')}</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>{t('about.features.secure.title')}</h3>
            <p>{t('about.features.secure.description')}</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>{t('about.features.efficient.title')}</h3>
            <p>{t('about.features.efficient.description')}</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🤝</div>
            <h3>{t('about.features.community.title')}</h3>
            <p>{t('about.features.community.description')}</p>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <h2>{t('about.team.title')}</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <div className={styles.memberAvatar}>👤</div>
            <h3>{t('about.team.member1.name')}</h3>
            <p className={styles.memberRole}>{t('about.team.member1.role')}</p>
            <p className={styles.memberBio}>{t('about.team.member1.bio')}</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberAvatar}>👤</div>
            <h3>{t('about.team.member2.name')}</h3>
            <p className={styles.memberRole}>{t('about.team.member2.role')}</p>
            <p className={styles.memberBio}>{t('about.team.member2.bio')}</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberAvatar}>👤</div>
            <h3>{t('about.team.member3.name')}</h3>
            <p className={styles.memberRole}>{t('about.team.member3.role')}</p>
            <p className={styles.memberBio}>{t('about.team.member3.bio')}</p>
          </div>
        </div>
      </section>

      <section className={styles.contact}>
        <h2>{t('about.contact.title')}</h2>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>📧</div>
            <h3>{t('about.contact.email')}</h3>
            <p>contact@daovc.com</p>
          </div>
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>💬</div>
            <h3>{t('about.contact.telegram')}</h3>
            <p>@daovc_community</p>
          </div>
          <div className={styles.contactItem}>
            <div className={styles.contactIcon}>🐦</div>
            <h3>{t('about.contact.twitter')}</h3>
            <p>@daovc_official</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 