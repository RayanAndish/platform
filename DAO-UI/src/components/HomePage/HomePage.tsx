import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ROUTES } from '@/constants/routes';
import { TIER_LEVELS } from '@/constants/config';
import styles from '@/styles/pages/HomePage.module.css';
import { InjectedConnector } from '@web3-react/injected-connector';

const injected = new InjectedConnector({
  supportedChainIds: [1, 11155111, 137, 80001, 56]
});

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { active, activate } = useWeb3React<Web3Provider>();
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize particles animation
    const initParticles = () => {
      if (particlesRef.current) {
        // Particle animation logic will be added here
      }
    };

    initParticles();
  }, []);

  const handleConnectWallet = async () => {
    if (!active) {
      try {
        await activate(injected);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      navigate(ROUTES.PROJECTS);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Video */}
      <video 
        className={styles.backgroundVideo}
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="~/public/images/loop.mp4" type="video/mp4" />
      </video>

      {/* Animated Background */}
      <div className={styles.particlesContainer} ref={particlesRef} />
      <div className={styles.gridPattern} />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.gradientText}>{t('home.hero.title')}</span>
          </h1>
          <p className={styles.heroSubtitle}>{t('home.hero.subtitle')}</p>
          <div className={styles.buttonGroup}>
            <button 
              className={`${styles.button} ${styles.primaryButton}`}
              onClick={() => navigate(ROUTES.PROJECTS)}
            >
              {t('home.hero.exploreButton')}
            </button>
            <button 
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={handleConnectWallet}
            >
              {t('home.hero.connectButton')}
            </button>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.tokenGlow} />
          <div className={styles.chartAnimation} />
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              <span className={styles.counter}>{t('home.stats.numbers.tvl')}</span>
            </div>
            <div className={styles.statLabel}>{t('home.stats.tvl')}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              <span className={styles.counter}>{t('home.stats.numbers.projects')}</span>
            </div>
            <div className={styles.statLabel}>{t('home.stats.projects')}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              <span className={styles.counter}>{t('home.stats.numbers.holders')}</span>
            </div>
            <div className={styles.statLabel}>{t('home.stats.holders')}</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>{t('home.features.title')}</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>{t('home.features.security.title')}</h3>
            <p>{t('home.features.security.description')}</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>{t('home.features.speed.title')}</h3>
            <p>{t('home.features.speed.description')}</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💎</div>
            <h3>{t('home.features.rewards.title')}</h3>
            <p>{t('home.features.rewards.description')}</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <h2 className={styles.sectionTitle}>{t('home.how_it_works.title')}</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h3>{t('home.how_it_works.step1.title')}</h3>
            <p>{t('home.how_it_works.step1.description')}</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h3>{t('home.how_it_works.step2.title')}</h3>
            <p>{t('home.how_it_works.step2.description')}</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h3>{t('home.how_it_works.step3.title')}</h3>
            <p>{t('home.how_it_works.step3.description')}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>{t('home.cta.title')}</h2>
          <p>{t('home.cta.description')}</p>
          <button 
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={() => navigate(ROUTES.STAKING)}
          >
            {t('home.cta.button')}
          </button>
        </div>
        <div className={styles.ctaVisual} />
      </section>

      <section className={styles.tiersSection}>
        <h2 className={styles.sectionTitle}>{t('home.tiers.title')}</h2>
        <p className={styles.sectionSubtitle}>{t('home.tiers.subtitle')}</p>
        <div className={styles.tiersGrid}>
          {Object.entries(TIER_LEVELS).map(([key, tier]) => (
            <div key={key} className={styles.tierCard} data-tier={key}>
              <h3 className={styles.tierName}>
                {t(`home.tiers.${key}.name`)}
              </h3>
              <div className={styles.tierDetails}>
                <p>{t('home.tiers.stake_amount', { amount: tier.minStake })}</p>
              </div>
              <ul className={styles.benefitsList}>
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className={styles.benefitItem}>
                    {t(`home.tiers.benefits.${benefit}`)}
                  </li>
                ))}
              </ul>
              <button 
                className={styles.stakeButton}
                onClick={() => navigate(ROUTES.STAKING)}
              >
                {t('common.stake_now')}
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  );
};

export default HomePage;