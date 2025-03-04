// src/components/HomePage/styles/Header.styles.ts
import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 20px;
  width: 100%;  // add width: 100%
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 20px;
`;

export const NavLink = styled(Link)` // Assuming NavLink is a styled Link component from react-router-dom.
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #ccc;
  }
`;

export const LanguageSelect = styled.select`
  background-color: rgb(255, 189, 7);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  option {
    color: black;
  }
`;