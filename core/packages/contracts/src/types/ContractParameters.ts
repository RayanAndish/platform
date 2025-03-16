import { BigNumber } from 'ethers';

export interface TokenParams {
  initialSupply: BigNumber;
  maxSupply: BigNumber;
  minTransferAmount: BigNumber;
  maxTransferAmount: BigNumber;
  transferFee: number;
  burnRate: number;
  transfersPaused: boolean;
}

export interface StakingParams {
  minStakeAmount: BigNumber;
  maxStakeAmount: BigNumber;
  lockPeriod: number;
  rewardRate: number;
  tierThresholds: BigNumber[];
  tierMultipliers: number[];
  earlyUnstakePenalty: number;
  maxStakersPerTier: number;
  stakingPaused: boolean;
}

export interface VotingParams {
  minVotingPeriod: number;
  maxVotingPeriod: number;
  quorumPercentage: number;
  minProposalThreshold: BigNumber;
  votingDelay: number;
  minVotingPower: BigNumber;
  maxVotesPerUser: number;
  votingPaused: boolean;
}

export interface FinanceParams {
  minInvestment: BigNumber;
  maxInvestment: BigNumber;
  investmentFee: number;
  withdrawalFee: number;
  performanceFee: number;
  minLockPeriod: number;
  maxProjectBudget: BigNumber;
  minROI: number;
  investmentsPaused: boolean;
}

export interface DAOParams {
  executionDelay: number;
  guardianDelay: number;
  minMemberCount: number;
  maxMemberCount: number;
  proposalThreshold: BigNumber;
  minVotingWeight: BigNumber;
  maxProposalsPerMember: number;
  proposalsPaused: boolean;
}

export interface ProjectParams {
  minDuration: number;
  maxDuration: number;
  minBudget: BigNumber;
  maxBudget: BigNumber;
  minDevelopers: number;
  maxDevelopers: number;
  reviewPeriod: number;
  projectsPaused: boolean;
}

export interface ConsensusParams {
  minValidators: number;
  maxValidators: number;
  validatorStake: BigNumber;
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
  // تبدیل اعداد بزرگ به BigNumber
  toBigNumber: (value: string): BigNumber => {
    return BigNumber.from(value);
  },

  // تبدیل BigNumber به رشته
  fromBigNumber: (value: BigNumber): string => {
    return value.toString();
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