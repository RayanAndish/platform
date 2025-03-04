// src/components/HighestFundedProjects/HighestFundedProjects.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HighestFundedProjectsContainer, ProjectCard, ProjectImage, ProjectTitle, ProjectDetails, SeeProjectLink } from './Styles/HighestFundedProjects.styles.ts';
interface HighestFundedProject {
    image: string;
    title: string;
    amountRaised: string;
    endsIn: string;
}
interface HighestFundedProjectsProps {
    projects: HighestFundedProject[];
}
const HighestFundedProjects: React.FC<HighestFundedProjectsProps> = ({ projects }) => {
    const { t } = useTranslation();
    return (
        <HighestFundedProjectsContainer>
            <h2>{t('highestFundedProjects')}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}> {/* Add a wrapper for the project cards */}
                {projects.map((project, index) => (
                    <ProjectCard key={index}>
                        <ProjectImage src={project.image} alt={project.title} />
                        <div>
                            <ProjectTitle>{project.title}</ProjectTitle>
                            <ProjectDetails>
                                <p>{t('amountRaised')}: {project.amountRaised}</p>
                                <p>{t('endsIn')}: {project.endsIn}</p>
                            </ProjectDetails>
                            <SeeProjectLink href="#">{t('seeProject')}</SeeProjectLink>
                        </div>
                    </ProjectCard>
                ))}
            </div>
        </HighestFundedProjectsContainer>
    );
};
export default HighestFundedProjects;