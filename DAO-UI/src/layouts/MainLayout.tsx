import React from 'react';
import Header from '../components/HomePage/Header';
import Footer from '../components/HomePage/Footer';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 