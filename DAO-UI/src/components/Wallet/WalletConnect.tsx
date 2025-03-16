import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useTranslation } from 'react-i18next';
import styles from '@/styles/components/WalletConnect.module.css';

const injected = new InjectedConnector({
  supportedChainIds: [1, 11155111, 137, 80001, 56]
});

const WalletConnect: React.FC = () => {
  const { t } = useTranslation();
  const { active, activate, deactivate } = useWeb3React<Web3Provider>();

  const handleConnectWallet = async () => {
    if (!active) {
      try {
        await activate(injected);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      try {
        deactivate();
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
      }
    }
  };

  return (
    <button
      onClick={handleConnectWallet}
      className={styles.connectButton}
    >
      {active ? t('common.disconnect') : t('common.connect_wallet')}
    </button>
  );
};

export default WalletConnect;