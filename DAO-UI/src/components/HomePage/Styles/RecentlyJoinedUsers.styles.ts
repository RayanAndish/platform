// src/components/RecentlyJoinedUsers/styles/RecentlyJoinedUsers.styles.ts
import styled from 'styled-components';

export const RecentlyJoinedUsersContainer = styled.section`
    margin-bottom: 40px;
`;

export const UserCard = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #1a1430;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-in-out;
    width: 100%;
    max-width: 200px; // Limit the width of each card
    &:hover {
        transform: translateY(-5px);
    }
`;

export const UserImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
`;

export const UserName = styled.span`
    font-size: 1.1rem;
    font-weight: bold;
`;
export const SeeAllLink = styled.a`
  color: #7933ff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  font-size: 0.9rem;
`;