import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '@/styles/pages/About.module.css';
import { FaUsers, FaShieldAlt, FaBolt } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { IconType } from 'react-icons';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ContactItem {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const features: FeatureItem[] = [
    {
      icon: FaUsers({ size: 32 }),
      title: t('about.features.community.title'),
      description: t('about.features.community.description')
    },
    {
      icon: FaShieldAlt({ size: 32 }),
      title: t('about.features.security.title'),
      description: t('about.features.security.description')
    },
    {
      icon: FaBolt({ size: 32 }),
      title: t('about.features.growth.title'),
      description: t('about.features.growth.description')
    }
  ];

  const team = [
    {
      name: t('about.team.members.sarah.name'),
      role: t('about.team.members.sarah.role'),
      description: t('about.team.members.sarah.description'),
      avatar: '/images/team/sarah.jpg'
    },
    {
      name: t('about.team.members.michael.name'),
      role: t('about.team.members.michael.role'),
      description: t('about.team.members.michael.description'),
      avatar: '/images/team/michael.jpg'
    },
    {
      name: t('about.team.members.elena.name'),
      role: t('about.team.members.elena.role'),
      description: t('about.team.members.elena.description'),
      avatar: '/images/team/elena.jpg'
    }
  ];

  const contactInfo: ContactItem[] = [
    {
      icon: MdEmail({ size: 32 }),
      title: t('about.contact.email.title'),
      value: t('about.contact.email.value')
    },
    {
      icon: MdLocationOn({ size: 32 }),
      title: t('about.contact.location.title'),
      value: t('about.contact.location.value')
    }
  ];

  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.pageTitle}>{t('about.title')}</h1>
      <p className={styles.pageSubtitle}>{t('about.subtitle')}</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('about.mission.title')}</h2>
        <p>{t('about.mission.description')}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('about.whyChooseUs.title')}</h2>
        <div className={styles.whyChooseUs}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>{t('about.team.title')}</h2>
        <div className={styles.teamGrid}>
          {team.map((member, index) => (
            <div key={index} className={styles.teamMember}>
              <img src={member.avatar} alt={member.name} className={styles.memberAvatar} />
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <p className={styles.memberDescription}>{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('about.contact.title')}</h2>
        <div className={styles.contactSection}>
          {contactInfo.map((info, index) => (
            <div key={index} className={styles.contactItem}>
              <div className={styles.contactIcon}>
                {info.icon}
              </div>
              <h3 className={styles.contactTitle}>{info.title}</h3>
              <p className={styles.contactValue}>{info.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 