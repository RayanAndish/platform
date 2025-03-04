// src/components/HomePage/Header.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { StyledHeader, Logo, Navigation, NavLink, LanguageSelect } from './Styles/Header.styles.ts';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'; // Import useAccount

interface HeaderProps {
    isLoggedIn: boolean;
    onLogin: () => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogin, onLogout }) => {
    const { t, i18n } = useTranslation();
    const { address, isConnected } = useAccount(); // Get account and isConnected

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <StyledHeader>
            <Logo>{t('appName')}</Logo>
            <Navigation>
                <NavLink to="/">{t('home')}</NavLink>
                <NavLink to="/projects">{t('projects')}</NavLink>
                <NavLink to="/discovery">{t('discovery')}</NavLink>
                <NavLink to="/documentation">{t('documentation')}</NavLink>
            </Navigation>
            {isConnected ? (
                <>
                    <span>{address.substring(0, 6)}...{address.substring(address.length - 4)}</span>
                </>
            ) : (
                <ConnectButton /> // Show the Connect Button
            )}
            <LanguageSelect onChange={(e) => changeLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="fa">فارسی</option>
                <option value="ar">العربیة</option>
                <option value="de">Dutch</option>
                <option value="ru">Russen</option>
            </LanguageSelect>
        </StyledHeader>
    );
};

export default Header;