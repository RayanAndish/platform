export const CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  WEB3_PROVIDER: process.env.REACT_APP_WEB3_PROVIDER || 'http://localhost:8545',
  CHAIN_ID: parseInt(process.env.REACT_APP_CHAIN_ID || '1'),
  CONTRACT_ADDRESSES: {
    TOKEN: process.env.REACT_APP_TOKEN_CONTRACT,
    STAKING: process.env.REACT_APP_STAKING_CONTRACT,
    VOTING: process.env.REACT_APP_VOTING_CONTRACT,
    PROJECTS: process.env.REACT_APP_PROJECTS_CONTRACT,
  },
  SUPPORTED_CHAINS: [1, 3, 4, 5, 42],
  IPFS_GATEWAY: process.env.REACT_APP_IPFS_GATEWAY || 'https://ipfs.io/ipfs/',
} as const;

export const TIER_LEVELS = {
  bronze: {
    name: 'Bronze',
    level: 1,
    minStake: 1000,
    maxStake: 5000,
    benefits: ['allocation', 'early_access', 'voting']
  },
  silver: {
    name: 'Silver',
    level: 2,
    minStake: 5001,
    maxStake: 10000,
    benefits: ['allocation', 'early_access', 'voting', 'rewards']
  },
  gold: {
    name: 'Gold',
    level: 3,
    minStake: 10001,
    maxStake: 50000,
    benefits: ['allocation', 'early_access', 'voting', 'rewards', 'airdrops']
  },
  diamond: {
    name: 'Diamond',
    level: 4,
    minStake: 50001,
    maxStake: 100000,
    benefits: ['allocation', 'early_access', 'voting', 'rewards', 'airdrops', 'refunds']
  }
} as const; 