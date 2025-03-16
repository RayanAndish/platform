import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Card, Statistic, Row, Col } from 'antd';
import { formatEther } from 'ethers';
import styles from '@/styles/components/WalletDashboard.module.css';
import { shortenAddress } from '@/utils/blockchain';

const supportedNetworks = [
  { id: 1, name: "Ethereum", icon: "🌐" },
  { id: 11155111, name: "Sepolia", icon: "🔷" },
  { id: 137, name: "Polygon", icon: "💜" },
  { id: 80001, name: "Mumbai", icon: "💜" },
  { id: 56, name: "BSC", icon: "💛" },
];

const injected = new InjectedConnector({
  supportedChainIds: [1, 11155111, 137, 80001, 56]
});

export const WalletDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { account, chainId, library: provider, deactivate, activate } = useWeb3React<Web3Provider>();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNetworkMenuOpen, setIsNetworkMenuOpen] = useState(false);
  const [balance, setBalance] = useState("0");
  const [isConnecting, setIsConnecting] = useState(false);

  const getBalance = useCallback(async () => {
    if (provider && account) {
      try {
        const rawBalance = await provider.getBalance(account);
        setBalance(rawBalance.toString());
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  }, [provider, account]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      await activate(injected);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await deactivate();
      setBalance("0");
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const switchNetwork = async (networkId: number) => {
    try {
      const { ethereum } = window as any;
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${networkId.toString(16)}` }],
      });
    } catch (error) {
      console.error("Error switching network:", error);
    }
    setIsNetworkMenuOpen(false);
  };

  const checkIfWalletIsInstalled = () => {
    const { ethereum } = window as any;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.walletDashboard}`)) {
        setIsDropdownOpen(false);
        setIsNetworkMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentNetwork = supportedNetworks.find(net => net.id === chainId) || supportedNetworks[0];

  return (
    <div className={styles.container}>
      <Card title={t('wallet.dashboard')}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title={t('wallet.balance')} value={balance} suffix="ETH" />
          </Col>
          <Col span={12}>
            <Statistic title={t('wallet.address')} value={shortenAddress(account || '')} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};