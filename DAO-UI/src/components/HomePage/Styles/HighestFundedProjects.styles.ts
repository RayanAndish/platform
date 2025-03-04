// src/components/HighestFundedProjects/styles/HighestFundedProjects.styles.ts
import styled from 'styled-components';

export const HighestFundedProjectsContainer = styled.section`
    margin-bottom: 40px;
`;

export const ProjectCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: #1a1430;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-in-out;
    width: 100%; // Take full width
`;

export const ProjectImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
`;

export const ProjectTitle = styled.h3`
    font-size: 1.2rem;
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