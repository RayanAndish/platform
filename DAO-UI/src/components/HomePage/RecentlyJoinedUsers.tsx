// src/components/RecentlyJoinedUsers/RecentlyJoinedUsers.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RecentlyJoinedUsersContainer, UserCard, UserImage, UserName, SeeAllLink } from './Styles/RecentlyJoinedUsers.styles.ts';

interface User {
    image: string;
    name: string;
}

interface RecentlyJoinedUsersProps {
    users: User[];
}

const RecentlyJoinedUsers: React.FC<RecentlyJoinedUsersProps> = ({ users }) => {
    const { t } = useTranslation();

    return (
        <RecentlyJoinedUsersContainer>
            <h2>
                {t('recentlyJoinedUsers')} <SeeAllLink href="#">{t('seeAll')}</SeeAllLink>
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}> {/* Add a wrapper for the user cards */}
                {users.map((user, index) => (
                    <UserCard key={index}>
                        <UserImage src={user.image} alt={user.name} />
                        <UserName>{user.name}</UserName>
                    </UserCard>
                ))}
            </div>
        </RecentlyJoinedUsersContainer>
    );
};

export default RecentlyJoinedUsers;