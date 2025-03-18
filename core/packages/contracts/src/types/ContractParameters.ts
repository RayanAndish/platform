import { BigNumberish, parseUnits, formatUnits } from 'ethers';

export interface TokenParams {
  initialSupply: BigNumberish;
  maxSupply: BigNumberish;
  minTransferAmount: BigNumberish;
  maxTransferAmount: BigNumberish;
  transferFee: number;
  burnRate: number;
  transfersPaused: boolean;
}

export interface StakingParams {
  minStakeAmount: BigNumberish;
  maxStakeAmount: BigNumberish;
  lockPeriod: number;
  rewardRate: number;
  tierThresholds: BigNumberish[];
  tierMultipliers: number[];
  earlyUnstakePenalty: number;
  maxStakersPerTier: number;
  stakingPaused: boolean;
}

export interface VotingParams {
  minVotingPeriod: number;
  maxVotingPeriod: number;
  quorumPercentage: number;
  minProposalThreshold: BigNumberish;
  votingDelay: number;
  minVotingPower: BigNumberish;
  maxVotesPerUser: number;
  votingPaused: boolean;
}

export interface FinanceParams {
  minInvestment: BigNumberish;
  maxInvestment: BigNumberish;
  investmentFee: number;
  withdrawalFee: number;
  performanceFee: number;
  minLockPeriod: number;
  maxProjectBudget: BigNumberish;
  minROI: number;
  investmentsPaused: boolean;
}

export interface DAOParams {
  executionDelay: number;
  guardianDelay: number;
  minMemberCount: number;
  maxMemberCount: number;
  proposalThreshold: BigNumberish;
  minVotingWeight: BigNumberish;
  maxProposalsPerMember: number;
  proposalsPaused: boolean;
}

export interface ProjectParams {
  minDuration: number;
  maxDuration: number;
  minBudget: BigNumberish;
  maxBudget: BigNumberish;
  minDevelopers: number;
  maxDevelopers: number;
  reviewPeriod: number;
  projectsPaused: boolean;
}

export interface ConsensusParams {
  minValidators: number;
  maxValidators: number;
  validatorStake: BigNumberish;
  validationPeriod: number;
  validationThreshold: number;
  slashingPenalty: number;
  validationPaused: boolean;
}

export interface ContractParameters {
  token: TokenParams;
  staking: StakingParams;
  voting: VotingParams;
  finance: FinanceParams;
  dao: DAOParams;
  project: ProjectParams;
  consensus: ConsensusParams;
}

// تبدیل‌کننده‌های کمکی
export const helpers = {
  // تبدیل اعداد به BigNumberish
  toBigNumber: (value: string, decimals: number = 18): BigNumberish => {
    return parseUnits(value, decimals);
  },

  // تبدیل BigNumberish به رشته
  fromBigNumber: (value: BigNumberish, decimals: number = 18): string => {
    return formatUnits(value, decimals);
  },

  // تبدیل ثانیه به میلی‌ثانیه
  toMilliseconds: (seconds: number): number => {
    return seconds * 1000;
  },

  // تبدیل میلی‌ثانیه به ثانیه
  toSeconds: (milliseconds: number): number => {
    return Math.floor(milliseconds / 1000);
  },

  // تبدیل درصد به عدد (مثلاً 10% به 100)
  toPercentageValue: (percentage: number): number => {
    return percentage * 10;
  },

  // تبدیل عدد به درصد
  fromPercentageValue: (value: number): number => {
    return value / 10;
  }
}; 