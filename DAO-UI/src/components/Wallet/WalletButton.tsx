import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useTranslation } from 'react-i18next';
import { shortenAddress } from '@/utils/blockchain';
import styles from '@/styles/components/WalletButton.module.css';

const injected = new InjectedConnector({
  supportedChainIds: [1, 11155111, 137, 80001, 56]
});

const supportedNetworks = [
  { id: 1, name: "Ethereum", icon: "🌐" },
  { id: 11155111, name: "Sepolia", icon: "🔷" },
  { id: 137, name: "Polygon", icon: "💜" },
  { id: 80001, name: "Mumbai", icon: "💜" },
  { id: 56, name: "BSC", icon: "💛" },
];

const WalletButton: React.FC = () => {
  const { t } = useTranslation();
  const { account, chainId, active, activate, deactivate } = useWeb3React<Web3Provider>();
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);

  const handleConnect = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      deactivate();
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
    setShowWalletMenu(false);
  };

  const handleNetworkSwitch = async (networkId: number) => {
    try {
      await window?.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${networkId.toString(16)}` }],
      });
    } catch (error) {
      console.error('Error switching network:', error);
    }
    setShowNetworkMenu(false);
  };

  if (!active || !account) {
    return (
      <button 
        onClick={handleConnect} 
        className={styles.connectButton}
      >
        {t('wallet.connect')}
      </button>
    );
  }

  const currentNetwork = supportedNetworks.find(n => n.id === chainId);

  return (
    <div className={styles.walletContainer}>
      <button 
        className={styles.walletButton}
        onClick={() => setShowWalletMenu(!showWalletMenu)}
      >
        {shortenAddress(account)}
      </button>

      {showWalletMenu && (
        <div className={styles.walletMenu}>
          <div className={styles.menuItem}>
            <span>{shortenAddress(account)}</span>
          </div>
          
          <div 
            className={styles.menuItem}
            onClick={() => setShowNetworkMenu(!showNetworkMenu)}
          >
            <span>{currentNetwork?.name || 'Unknown Network'}</span>
          </div>

          {showNetworkMenu && (
            <div className={styles.networkMenu}>
              {supportedNetworks.map((network) => (
                <div
                  key={network.id}
                  className={styles.networkItem}
                  onClick={() => handleNetworkSwitch(network.id)}
                >
                  {network.icon} {network.name}
                </div>
              ))}
            </div>
          )}

          <div 
            className={styles.menuItem}
            onClick={handleDisconnect}
          >
            {t('wallet.disconnect')}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletButton; 