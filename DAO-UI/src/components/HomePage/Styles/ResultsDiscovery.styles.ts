// src/components/ResultsDiscovery/styles/ResultsDiscovery.styles.ts
import styled from 'styled-components';

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
export const SeeAllLink = styled.a`
  color: #7933ff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  font-size: 0.9rem;
`;