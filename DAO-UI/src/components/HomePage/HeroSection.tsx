// src/components/HomePage/HeroSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { StyledHeroSection, Title, Subtitle, CallToActionButtons, Button } from './styles.ts';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
    const { t, i18n } = useTranslation(); // Initialize useTranslation
      return (
      <StyledHeroSection>
        <Title>Token-Fundraising For <br />DECENTRALIZED DAO AND <br />INVESTMENT PLATFORM</Title>
        <Subtitle>Empower Your Startup: Tokenize, Commercialize, and Disseminate with Fundraising</Subtitle>
        <CallToActionButtons>
        <Link to="/DefineProject">  {/* Use Link for the button */}
          <Button primary>{t('defineProject')}</Button>
        </Link>
        <Button> {t('explore')}</Button>
      </CallToActionButtons>
      </StyledHeroSection>
    );
};

export default HeroSection;