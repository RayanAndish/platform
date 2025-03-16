import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 11155111, 137, 80001, 56], // Ethereum, Sepolia, Polygon, Mumbai, BSC
}); 