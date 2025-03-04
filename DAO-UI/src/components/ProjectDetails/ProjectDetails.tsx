// src/components/ProjectDetails/ProjectDetails.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ProjectDetailsContainer,
  ProjectImage,
  Tabs,
  Tab,
  ContentArea,
} from './Styles/ProjectDetails.styles.ts';
import Header from '../HomePage/Header.tsx';
import Footer from '../HomePage/Footer.tsx';
import NewsletterSection from '../HomePage/NewsletterSection.tsx';

// Define an interface for project details (this will depend on your data structure)
interface ProjectDetailsProps {
  projectId: string; // Or the appropriate identifier for your project
}
interface Project {
  imageUrl: string;
  title: string;
  description: string;
  tokenStandard: string;
  // ... (Other project details)
}

const ProjectDetails: React.FC<ProjectDetailsProps> = () => {
  const { projectId } = useParams(); // Get projectId from URL
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('details');
  const [project, setProject] = useState<Project | null>(null);

  // Simulated data fetching (replace with your actual API call)
  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) return;  // اگر projectId وجود نداشت، هیچ کاری انجام نده.
      // Simulate API call using the projectId
      const mockProject: Project = {
        imageUrl: '/images/p1.png', // Replace with the actual image path
        title: `Project ${projectId}`, // Use projectId to make it dynamic
        description: `This is a sample description for project ${projectId}.`,
        tokenStandard: 'ERC-721',
        // ... (More project details)
      };
      setProject(mockProject);
    };

    fetchProjectDetails();
  }, [projectId]);

    const renderContent = () => {
        if (!project) {
            return <p>{t('loading')}</p>; // Or a loading spinner
        }

        switch (activeTab) {
            case 'details':
                return (
                    <div>
                        {/* Information Section */}
                        <p>Token Standard: {project.tokenStandard}</p>
                        {/* Project Summary (Problem statement and objectives) */}
                        <h3>Project Summary</h3>
                        <p>{project.description}</p>
                    </div>
                );
            case 'timelineBudget':
                return (
                    <div>
                        {/* Timeline & Budget content here (based on your data) */}
                        Timeline & Budget Content
                    </div>
                );
            case 'contributors':
                return (
                    <div>
                        {/* Contributors content here */}
                        Contributors Content
                    </div>
                );
            case 'results':
                return (
                    <div>
                        {/* Results content here */}
                        Results Content
                    </div>
                );
            case 'discussion':
                return (
                    <div>
                        {/* Discussion content here */}
                        Discussion Content
                    </div>
                );
            default:
                return null;
        }
    };

  return (
    <>
      <Header />
      <ProjectDetailsContainer>
        {project && <ProjectImage src={project.imageUrl} alt={project.title} />}
        {/* Project Image */}

        <Tabs>
          <Tab active={activeTab === 'details'} onClick={() => setActiveTab('details')}>{t('details')}</Tab>
          <Tab active={activeTab === 'timelineBudget'} onClick={() => setActiveTab('timelineBudget')}>{t('timelineBudget')}</Tab>
          <Tab active={activeTab === 'contributors'} onClick={() => setActiveTab('contributors')}>{t('contributors')}</Tab>
          <Tab active={activeTab === 'results'} onClick={() => setActiveTab('results')}>{t('results')}</Tab>
          <Tab active={activeTab === 'discussion'} onClick={() => setActiveTab('discussion')}>{t('discussion')}</Tab>
        </Tabs>

        <ContentArea>
          {renderContent()}
        </ContentArea>
      </ProjectDetailsContainer>
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default ProjectDetails;