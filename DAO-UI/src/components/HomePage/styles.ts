// src/components/HomePage/styles.ts
import styled from 'styled-components';
import { FaPlus, FaRegCopy, FaCalendarAlt, FaDollarSign, FaFileAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// General
export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color:rgb(182, 106, 34); // Dark purple
  color: #fff;
  font-family: sans-serif;
  min-height: 100vh;
`;
export const Button = styled.button<{ primary?: boolean; secondary?: boolean }>`
  padding: 12px 25px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: ${({ primary, secondary }) => (primary ? '#7933ff' : secondary ? 'transparent' : '#241c3d')};
  color: ${({ primary, secondary }) => (primary ? '#fff' : secondary ? '#7933ff' : '#fff')};
  border: ${({ secondary }) => (secondary ? '2px solid #7933ff' : 'none')};
  transition: background-color 0.2s ease;
  margin-right: 10px;

  &:hover {
    background-color: ${({ primary }) => (primary ? '#692acc' : '#f0e6ff')};
  }
`;

export const ProjectLinkSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AddLinkButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #7933ff;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  &:hover {
    background-color: #692acc;
  }
`;

export const LinkInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #241c3d;
  color: #fff;
  border: none;
  &::placeholder {
    color: #888;
  }
`;

export const StyledIcon = styled.span`
  margin-right: 5px;
  font-size: 1.2rem;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 8px;
  background-color: #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => `${progress}%`};
    background-color: #7933ff;
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

export const TimelineSection = styled.div`
    margin-bottom: 20px;
`;

export const TimelineItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
`;

export const TimelineInput = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
    background-color: #241c3d;
    color: #fff;
    border: none;
    &::placeholder {
      color: #888;
    }
`;

export const BudgetSection = styled.div`
    margin-bottom: 20px;
`;

export const BudgetItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
`;

export const BudgetItemInput = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.9rem;
    background-color: #241c3d;
    color: #fff;
    border: none;
    &::placeholder {
      color: #888;
    }
`;

export const BudgetItemDetails = styled.div`
    display: flex;
    gap: 10px;
`;

export const FundraisingMethodsSection = styled.div`
    margin-bottom: 20px;
`;

export const MethodOption = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    input[type="radio"] {
        margin-right: 8px;
    }
`;

export const ServiceFeeSection = styled.div`
    margin-bottom: 20px;
`;

export const SupplementaryDocumentSection = styled.div`
    margin-bottom: 20px;
`;

export const TeamMemberSection = styled.div`
    margin-bottom: 20px;
`;

export const TeamMemberInput = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;