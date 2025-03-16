import { IProviderOptions } from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

export const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: process.env.REACT_APP_ETHEREUM_RPC || 'https://mainnet.infura.io/v3/YOUR_INFURA_ID',
        56: process.env.REACT_APP_BSC_RPC || 'https://bsc-dataseed.binance.org',
        137: process.env.REACT_APP_POLYGON_RPC || 'https://polygon-rpc.com'
      }
    }
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'DAO UI',
      rpc: process.env.REACT_APP_ETHEREUM_RPC || 'https://mainnet.infura.io/v3/YOUR_INFURA_ID',
      chainId: 1
    }
  }
};

export const SUPPORTED_CHAINS = {
  ETHEREUM: 1,
  BSC: 56,
  POLYGON: 137
} as const;

export const RPC_URLS = {
  [SUPPORTED_CHAINS.ETHEREUM]: process.env.REACT_APP_ETHEREUM_RPC || 'https://mainnet.infura.io/v3/YOUR_INFURA_ID',
  [SUPPORTED_CHAINS.BSC]: process.env.REACT_APP_BSC_RPC || 'https://bsc-dataseed.binance.org',
  [SUPPORTED_CHAINS.POLYGON]: process.env.REACT_APP_POLYGON_RPC || 'https://polygon-rpc.com'
} as const; 