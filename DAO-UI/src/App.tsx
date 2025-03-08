import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom"; // فقط از Routes و Route استفاده کنید
import WalletDashboard from "./components/Wallet/WalletDashboard";
import WalletConnect from './components/Wallet/WalletConnect';
import HomePage from "./components/HomePage/HomePage";
import ProjectsPage from "./components/Projects/ProjectsPage";
import ProjectDetails from "./components/Projects/ProjectDetails";
import DefineProject from "./components/Projects/DefineProject";

const queryClient = new QueryClient();
const App: React.FC = () => {
  const handleConnect = (account: string) => {
    console.log("Connected account:", account);
  };
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/define-project" element={<DefineProject />} />
        <Route path="/wallet-dashboard" element={<WalletDashboard />} />
        <Route path="/wallet-connect" element={<WalletConnect onConnect={handleConnect} />} />
      </Routes>
    );
};

 

export default App;