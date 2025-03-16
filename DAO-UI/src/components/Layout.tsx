import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import HomePage from './HomePage/HomePage';
import AboutPage from './About/AboutPage';
import { ProjectsPage } from './Projects/ProjectsPage';
import { StakingPage } from './Staking/StakingPage';
import { WalletDashboard } from './Wallet/WalletDashboard';
import KYCForm from './KYC/KYCForm';
import { ROUTES } from '@/constants/routes';

const Layout: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
      </Route>
      
      <Route element={<DashboardLayout />}>
        <Route path={ROUTES.STAKING} element={<StakingPage />} />
        <Route path={ROUTES.WALLET} element={<WalletDashboard />} />
        <Route path={ROUTES.KYC} element={<KYCForm />} />
      </Route>
    </Routes>
  );
};

export default Layout; 