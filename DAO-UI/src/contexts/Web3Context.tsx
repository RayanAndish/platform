import React, { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { CONFIG } from '../constants/config';

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  chainId: number | null;
  connecting: boolean;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setConnecting(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        const chainId = await web3Instance.eth.getChainId();
        
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setChainId(chainId);
        setConnected(true);
      } catch (error) {
        console.error('Error connecting to Web3:', error);
      } finally {
        setConnecting(false);
      }
    }
  };

  const disconnect = () => {
    setWeb3(null);
    setAccount(null);
    setChainId(null);
    setConnected(false);
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        setChainId(parseInt(chainId));
      });

      window.ethereum.on('disconnect', () => {
        disconnect();
      });
    }

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
        window.ethereum.removeListener('disconnect', () => {});
      }
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3,
        account,
        chainId,
        connecting,
        connected,
        connect,
        disconnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}; 