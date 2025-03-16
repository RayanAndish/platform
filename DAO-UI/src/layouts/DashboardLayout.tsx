import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Header from '@/components/HomePage/Header';
import { ROUTES } from '@/constants/routes';

const DashboardLayout: React.FC = () => {
  const { active } = useWeb3React<Web3Provider>();

  if (!active) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          {/* Add sidebar navigation here */}
        </aside>
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 