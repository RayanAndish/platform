// src/components/HomePage/styles.ts
import styled from 'styled-components';

// General
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #120d26; // Dark purple
  color: #fff;
  font-family: sans-serif;
  min-height: 100vh;
`;

// Header
export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 20px;
`;

export const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #ccc;
  }
`;

export const ConnectWalletButton = styled.button`
  background-color: #7933ff; // Lighter purple
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #692acc;
  }
`;

// Hero Section
export const StyledHeroSection = styled.section`
  text-align: center;
  padding: 50px 0;
`;

export const Title = styled.h2`
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 20px;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

export const CallToActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const Button = styled.button<{ primary?: boolean }>`
  background-color: ${({ primary }) => (primary ? '#7933ff' : 'transparent')};
  color: ${({ primary }) => (primary ? '#fff' : '#7933ff')};
  border: 2px solid #7933ff;
  padding: 15px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: ${({ primary }) => (primary ? '#692acc' : '#f0e6ff')};
  }
`;

// Statistics Section
export const StyledStatisticsSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  border-bottom: 1px solid #333;
`;

export const Statistic = styled.div`
  text-align: center;
`;

export const StatisticValue = styled.span`
  font-size: 2rem;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

export const StatisticLabel = styled.span`
  font-size: 1rem;
  color: #ccc;
`;

// Newsletter Section
export const StyledNewsletterSection = styled.section`
  text-align: center;
  padding: 50px 0;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 300px;
`;

// Footer
export const StyledFooter = styled.footer`
  padding: 40px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-top: 1px solid #333;
`;

export const AboutSection = styled.div`
  width: 30%;
`;

export const UsefulLinksSection = styled.div`
  width: 30%;
`;

export const Link = styled.a`
  display: block;
  color: #ccc;
  text-decoration: none;
  margin-bottom: 5px;
  &:hover {
    color: #fff;
  }
`;

export const SocialLinks = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 15px;
`

export const SocialIcon = styled.a`
    color: #7933ff;
    font-size: 1.5rem;
    &:hover {
        color: #692acc;
    }
`