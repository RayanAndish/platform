import { formatUnits, parseEther } from 'ethers';

export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
};

export const formatBalance = (balance: string | number, decimals = 18): string => {
  try {
    return formatUnits(balance.toString(), decimals);
  } catch (error) {
    console.error('Error formatting balance:', error);
    return '0';
  }
};

export const toWei = (amount: string): string => {
  try {
    return parseEther(amount).toString();
  } catch (error) {
    console.error('Error converting to wei:', error);
    return '0';
  }
};

export const formatTokenAmount = (amount: string | number, symbol: string): string => {
  const formatted = formatBalance(amount);
  return `${formatted} ${symbol}`;
};

export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const getExplorerUrl = (chainId: number, hash: string, type: 'tx' | 'address' | 'token' = 'tx'): string => {
  const explorerUrls: { [key: number]: string } = {
    1: 'https://etherscan.io',
    11155111: 'https://sepolia.etherscan.io',
    137: 'https://polygonscan.com',
    80001: 'https://mumbai.polygonscan.com',
    56: 'https://bscscan.com'
  };

  const baseUrl = explorerUrls[chainId] || explorerUrls[1];
  return `${baseUrl}/${type}/${hash}`;
};

export const calculateTimeLeft = (deadline: number): { days: number; hours: number; minutes: number } => {
  const now = Math.floor(Date.now() / 1000);
  const timeLeft = Math.max(0, deadline - now);

  return {
    days: Math.floor(timeLeft / 86400),
    hours: Math.floor((timeLeft % 86400) / 3600),
    minutes: Math.floor((timeLeft % 3600) / 60)
  };
}; 