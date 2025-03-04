// src/components/HomePage/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header.tsx';
import HeroSection from './HeroSection.tsx';
import StatisticsSection from './StatisticsSection.tsx';
import NewsletterSection from './NewsletterSection.tsx';
import Footer from './Footer.tsx';
import OpenFundingCalls from './OpenFundingCalls.tsx';
import ResultsDiscovery from './ResultsDiscovery.tsx';
import RecentlyJoinedUsers from './RecentlyJoinedUsers.tsx';
import HighestFundedProjects from './HighestFundedProjects.tsx';
import FAQ from './FAQ.tsx';
import { Container, HeroSectionContainer, HeroTitle, HeroSubtitle, HeroButtonsContainer, Button, SectionTitle } from './Styles/HomePage.styles.ts';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [openFundingCallsData, setOpenFundingCallsData] = useState<any[]>([]); // State for open funding calls
  const [resultsDiscoveryData, setResultsDiscoveryData] = useState<any[]>([]);
  const [recentlyJoinedUsersData, setRecentlyJoinedUsersData] = useState<any[]>([]);
  const [highestFundedProjectsData, setHighestFundedProjectsData] = useState<any[]>([]);
  const [faqData, setFaqData] = useState<any[]>([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    //  In a real app, this would involve authentication
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    //  In a real app, this would involve logging out
  };

    useEffect(() => {
        // Fetch open funding calls
        const fetchOpenFundingCalls = async () => {
            try {
                const response = await fetch('/api/projects');  // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                // Assuming the backend returns a list of projects
                setOpenFundingCallsData(data.slice(0, 2)); // Display only 2 projects for now
            } catch (error) {
                console.error('Error fetching open funding calls:', error);
            }
        };
        // Fetch results discovery
        const fetchResultsDiscovery = async () => {
          try {
            const response = await fetch('/api/projects'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setResultsDiscoveryData(data.slice(0, 2));
          } catch (error) {
            console.error('Error fetching results discovery:', error);
          }
        };

        // Fetch recently joined users
        const fetchRecentlyJoinedUsers = async () => {
            // This is an example and needs to be implemented based on your API
            // Replace with your actual API endpoint
            setRecentlyJoinedUsersData([
                { image: '/images/user1.png', name: 'User A' },
                { image: '/images/user2.png', name: 'User B' },
            ]);
        };

        // Fetch highest funded projects
        const fetchHighestFundedProjects = async () => {
            // This is an example and needs to be implemented based on your API
            // Replace with your actual API endpoint
            setHighestFundedProjectsData([
                { image: '/images/project1.png', title: 'Project X', amountRaised: '$38,2262', endsIn: '7/31/2024' },
                { image: '/images/project2.png', title: 'Project Y', amountRaised: '$32,6681', endsIn: '7/28/2024' },
            ]);
        };
        // Fetch FAQ data (replace with your API)
        const fetchFaqData = async () => {
            setFaqData([
                { question: t('faqQuestion1'), answer: t('faqAnswer1') },
                { question: t('faqQuestion2'), answer: t('faqAnswer2') },
            ]);
        };

        fetchOpenFundingCalls();
        fetchResultsDiscovery();
        fetchRecentlyJoinedUsers();
        fetchHighestFundedProjects();
        fetchFaqData();
    }, [t]);

    return (
        <Container>
            <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
            <HeroSectionContainer>
              <HeroTitle>NFT-Fundraising For Decentralized Science and Open-Source Projects</HeroTitle>
              <HeroSubtitle>Empower Your Research: Tokenize, Commercialize, and Disseminate with NFT-Fundraising</HeroSubtitle>
              <HeroButtonsContainer>
                <Link to="/define-project">
                  <Button primary>{t('defineProject')}</Button>
                </Link>
                <Button>{t('explore')}</Button>
              </HeroButtonsContainer>
            </HeroSectionContainer>

            <SectionTitle>{t('openFundingCalls')}</SectionTitle>
            <OpenFundingCalls openCalls={openFundingCallsData} />

            {/* Show these sections only after login */}
            {isLoggedIn && (
                <>
                    <SectionTitle>{t('highestFundedProjects')}</SectionTitle>
                    <HighestFundedProjects projects={highestFundedProjectsData} />
                    <SectionTitle>{t('resultsDiscovery')}</SectionTitle>
                    <ResultsDiscovery results={resultsDiscoveryData} />
                    <SectionTitle>{t('recentlyJoinedUsers')}</SectionTitle>
                    <RecentlyJoinedUsers users={recentlyJoinedUsersData} />
                    <SectionTitle>{t('frequentlyAskedQuestions')}</SectionTitle>
                    <FAQ faqs={faqData} />
                </>
            )}

            <NewsletterSection />
            <Footer />
        </Container>
    );
};

export default HomePage;