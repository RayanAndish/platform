// src/App.tsx
import React from 'react';
import { WagmiConfig, useAccount, useConnect, useDisconnect } from 'wagmi'
import { createWeb3Modal, useWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { Web3Modal } from '@web3modal/ui'
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link 
} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.tsx';
import ProjectsPage from './components/ProjectsPage/ProjectsPage.tsx';
import DiscoveryPage from './components/DiscoveryPage/DiscoveryPage.tsx';
import DocumentationPage from './components/DocumentationPage/DocumentationPage.tsx';
import DefineProject from './components/DefineProject/DefineProject.tsx';
import ProjectDetails from './components/ProjectDetails/ProjectDetails.tsx';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {sepolia} from "@wagmi/chains";
import i18n from './i18n/i18n.ts';
import { useEffect } from 'react';

// 1. Define constants
const projectId = 'YOUR_PROJECT_ID'; // Replace with your WalletConnect project ID

// 2. Configure wagmi
const metadata = {
  name: 'Rayan DAO - VC',
  description: 'A Web3 Application for Rayan DAO',
  url: 'https://www.dao-vc.ir',
  icons: ['https://avatars.githubusercontent.com/u/37784886'] // Replace with your app icon
}

const chains = [sepolia]  // mainnet, polygon, avalanche, arbitrum  - removed other chains to keep things simple
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata
})

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

function App() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { connect, connectors, isLoading, error } = useConnect()
  const { disconnect } = useDisconnect()
  const queryClient = new QueryClient();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <header className="App-header">
            <h1>Rayan DAO - VC</h1>
            <div>
              {isConnected ? (
                <>
                  <p>Connected with {address}</p>
                  <button onClick={disconnect}>Disconnect</button>
                </>
              ) : (
                <button onClick={() => open()}>Connect Wallet</button>
              )}
              {error && <div>{error.message}</div>}
            </div>
          </header>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ProjectsPage" element={<ProjectsPage />} />
              <Route path="/DiscoveryPage" element={<DiscoveryPage />} />
              <Route path="/DocumentationPage" element={<DocumentationPage />} />
              <Route path="/DefineProject" element={<DefineProject />} />
              <Route path="/project/:projectId" element={<ProjectDetails />} />
            </Routes>
          </Router>
           <Web3Modal />
        </div>
      </QueryClientProvider>
    </WagmiConfig>
  );
}

export default App;