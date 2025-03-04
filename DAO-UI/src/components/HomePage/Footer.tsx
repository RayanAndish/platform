// src/components/HomePage/Footer.tsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { StyledFooter, AboutSection, UsefulLinksSection, NavLink, SocialLinks, SocialIcon } from './Styles/Footer.styles.ts';
import { FaXTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa6';

const Footer: React.FC = () => {
  const { t } = useTranslation(); // Initialize useTranslation
    return (
      <StyledFooter>
        <AboutSection>
          <h3>About Rayan DAO</h3>
          <p>At Rayan DAO, We aim to democratize access to funds and create a vibrant community of startups who are passionate about driving forward the frontiers of innovation. We see ourselves as catalysts for change in the startups landscape, unlocking creativity and accelerating progress for the betterment of all.</p>
          <SocialLinks>
            <SocialIcon href="#"><FaXTwitter /></SocialIcon>
            <SocialIcon href="#"><FaInstagram /></SocialIcon>
            <SocialIcon href="#"><FaLinkedin /></SocialIcon>
          </SocialLinks>
        </AboutSection>
        <UsefulLinksSection>
          <h3>Useful links</h3>
          <NavLink href="#">{t('Home')}</NavLink>
          <NavLink href="#">{t('Projects')}</NavLink>
          <NavLink href="#">{t('Terms of Service')}</NavLink>
          <NavLink href="#">{t('Documentation')}</NavLink>
        </UsefulLinksSection>
        <p>Copyright © 2024 Rayan DAO. All rights reserved.</p>
      </StyledFooter>
    );
};

export default Footer;