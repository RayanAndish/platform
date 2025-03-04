// src/components/OpenFundingCalls/styles/OpenFundingCalls.styles.ts
import styled from 'styled-components';

export const OpenFundingCallsContainer = styled.div`
  margin-bottom: 20px;
`;

export const OpenCallCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const OpenCallImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
`;

export const OpenCallTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

export const OpenCallSubtitle = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`;

export const OpenCallDetails = styled.div`
  flex-grow: 1;
  text-align: right;
`;

export const SeeAllLink = styled.a`
  color: #7933ff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  font-size: 0.9rem;
`;