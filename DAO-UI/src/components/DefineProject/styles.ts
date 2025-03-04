// src/components/DefineProject/styles.ts
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const DefineProjectContainer = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

export const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const Step = styled.div<{ active?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? '#7933ff' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#7933ff')};
  font-weight: bold;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
  color: #fff;
`;

export const Input = styled.input`
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

export const Select = styled.select`
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

export const TextArea = styled.textarea`
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

export const GraphicalAbstractSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GraphicalAbstractLabel = styled.label`
  display: block;
  padding: 15px;
  border: 1px dashed #7933ff;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  color: #7933ff;
  font-size: 1rem;
  margin-bottom: 10px;
  &:hover {
      background-color: rgba(121, 51, 255, 0.1);
  }
`;

export const GraphicalAbstractInput = styled.input`
  display: none;
`;

export const Button = styled.button<{ primary?: boolean; secondary?: boolean }>`
  padding: 12px 25px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: ${({ primary }) => (primary ? '#7933ff' : secondary ? 'transparent' : '#241c3d')};
  color: ${({ primary, secondary }) => (primary ? '#fff' : secondary ? '#7933ff' : '#fff')};
  border: ${({ secondary }) => (secondary ? '2px solid #7933ff' : 'none')};
  transition: background-color 0.2s ease;

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
    margin-bottom: 10px;
`

export const StyledIcon = styled.span`
  margin-right: 5px;
`;