// src/components/HomePage/styles/HomePage.styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  background-color:rgb(99, 120, 121); // Dark purple
  color: #fff;
  font-family: sans-serif;
  min-height: 100vh;
`;

export const HeroSectionContainer = styled.section`
  text-align: center;
  padding: 50px 0;
`;

export const HeroTitle = styled.h2`
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 20px;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

export const HeroButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
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

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: left; // or the desired alignment
  margin-top: 40px;
`;

// Open Funding Calls
export const OpenFundingCallsContainer = styled.section`
  margin-bottom: 40px;
`;

export const OpenCallCard = styled.div`
  display: flex;
  align-items: center;  // Align items vertically
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: #1a1430;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const OpenCallImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

export const OpenCallTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

export const OpenCallSubtitle = styled.p`
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 10px;
`;

export const OpenCallDetails = styled.div`
  flex-grow: 1;
  text-align: right; // Align details to the right
`;

export const SeeAllLink = styled.a`
  color: #7933ff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  font-size: 0.9rem;
`;

// Statistics Section (you can adjust the styles based on your design)
export const StatisticsSectionContainer = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  border-bottom: 1px solid #333;
  margin-bottom: 30px;
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

// Results Discovery (you can adjust the styles based on your design)
export const ResultsDiscoveryContainer = styled.section`
    margin-bottom: 40px;
`;
export const ResultCard = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: #1a1430;
    border-radius: 8px;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const ResultImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;
`;

export const ResultTitle = styled.h3`
    font-size: 1.3rem;
    margin-bottom: 5px;
`;

export const ResultSubtitle = styled.p`
    font-size: 1rem;
    color: #ccc;
`;
// Recently Joined Users (you can adjust the styles based on your design)
export const RecentlyJoinedUsersContainer = styled.section`
    margin-bottom: 40px;
`;

export const UserCard = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #1a1430;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }
`;
export const UserImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
`;

export const UserName = styled.span`
    font-size: 1.1rem;
    font-weight: bold;
`;
// Highest Funded Projects (you can adjust the styles based on your design)
export const HighestFundedProjectsContainer = styled.section`
    margin-bottom: 40px;
`;

export const ProjectCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #1a1430;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }
`;
export const ProjectImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
`;

export const ProjectTitle = styled.h3`
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const ProjectDetails = styled.div`
    text-align: right;
`;
export const SeeProjectLink = styled.a`
    color: #7933ff;
    text-decoration: none;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`;

// FAQ (you can adjust the styles based on your design)
export const FAQContainer = styled.section`
  margin-bottom: 40px;
`;
export const FAQItem = styled.div`
  margin-bottom: 15px;
`;

export const Question = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

export const Answer = styled.p`
  font-size: 1rem;
  color: #ccc;
`;

export const NewsletterSectionContainer = styled.section`
    text-align: center;
    padding: 50px 0;
`;
export const NewsletterTitle = styled.h2`
    font-size: 1.8rem;
    margin-bottom: 10px;
`;

export const NewsletterForm = styled.form`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

export const NewsletterInput = styled.input`
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    width: 300px;
    background-color: #241c3d;
    color: #fff;
    border: none;
    &::placeholder {
        color: #888;
    }
`;

export const FooterContainer = styled.footer`
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
`;

export const SocialIcon = styled.a`
    color: #7933ff;
    font-size: 1.5rem;
    &:hover {
        color: #692acc;
    }
`;