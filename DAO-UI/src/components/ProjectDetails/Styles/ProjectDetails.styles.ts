// src/components/ProjectDetails/ProjectDetails.styles.ts
import styled from 'styled-components';

export const ProjectDetailsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1a1430; // Use a background color
`;

export const ProjectImage = styled.img`
  width: 100%; // or a fixed width
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #333;
  margin-bottom: 10px;
`;

export const Tab = styled.button<{ active?: boolean }>`
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: ${({ active }) => (active ? '#7933ff' : '#ccc')};
  border-bottom: ${({ active }) => (active ? '2px solid #7933ff' : 'none')};
  &:focus {
    outline: none;
  }
`;

export const ContentArea = styled.div`
  padding: 20px 0;
  color: #fff;  // Set text color
`;