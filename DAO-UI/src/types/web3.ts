import { Contract } from 'ethers';
import type { BigNumberish } from 'ethers';

export type ContractMethod<T = any> = {
  (...args: any[]): Promise<T>;
};

export interface StakingContractInterface {
  totalStaked: ContractMethod<BigNumberish>;
  stake: ContractMethod<any>;
  unstake: ContractMethod<any>;
  getStakingInfo: ContractMethod<[BigNumberish, BigNumberish, BigNumberish]>;
}

export interface VotingContractInterface {
  getVotingPower: ContractMethod<BigNumberish>;
  vote: ContractMethod<any>;
  getProposal: ContractMethod<any>;
}

export type StakingContract = Contract & StakingContractInterface;
export type VotingContract = Contract & VotingContractInterface;

export interface TokenInfo {
  address: string;
  symbol: string;
  decimals: number;
  balance: string;
} 