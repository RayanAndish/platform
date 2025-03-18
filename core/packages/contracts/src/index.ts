// صادرات نوع‌ها
export * from '../typechain-types';

// صادرات ABI‌ها
export { ContractParameters } from '../typechain-types';
export { Token } from '../typechain-types';
export { Staking } from '../typechain-types';
export { Voting } from '../typechain-types';
export { Finance } from '../typechain-types';
export { DAO } from '../typechain-types';

// Export parameter types
export * from './types/ContractParameters';

// Export helpers
export { helpers } from './types/ContractParameters';

// تابع کمکی برای واردکردن ABI‌ها
function loadABI(path: string) {
  try {
    return require(path);
  } catch {
    console.warn(`Warning: Could not load ABI from ${path}`);
    return {};
  }
}

// صادرات ABI‌ها به صورت داینامیک
export const ContractParametersABI = loadABI('../artifacts/contracts/core/parameters/ContractParameters.sol/ContractParameters.json');
export const TokenABI = loadABI('../artifacts/contracts/core/token/Token.sol/Token.json');
export const StakingABI = loadABI('../artifacts/contracts/core/staking/Staking.sol/Staking.json');
export const VotingABI = loadABI('../artifacts/contracts/core/voting/Voting.sol/Voting.json');
export const FinanceABI = loadABI('../artifacts/contracts/core/finance/Finance.sol/Finance.json');
export const DAOABI = loadABI('../artifacts/contracts/core/dao/DAO.sol/DAO.json'); 