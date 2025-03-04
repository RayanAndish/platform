// src/utils/walletConfig.ts
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { sepolia, arbitrum } from 'wagmi/chains'; // Import the chains you want to support

// Ensure Ganache is configured with the correct chainId.
const ganacheChainId = 5777; // or your Ganache chainId (if you changed it)

//  Define your custom chain for Ganache (if not using a standard chainId)
const ganacheChain = {
  id: ganacheChainId,
  name: 'Ganache',
  network: 'ganache',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: 'http://172.16.22.120:9545', // Your Ganache RPC URL (adjust if different)
    },
  },
  testnet: true, // or false if it's not a test network
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    ganacheChain, // Add your Ganache chain
    sepolia,  // Add other chains like sepolia if you need them
    // mainnet,
  ],
  [
    publicProvider(), // Add publicProvider, you can add your own providers
  ]
);

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
          chains,
          options: {
              appName: 'Rayan DAO', //  Your app name
              // ... other options
          },
      }),
      new InjectedConnector({
          chains,
          options: {
              name: 'Injected',
              shimDisconnect: true,
          },
      }),
  ],
});

export { chains };