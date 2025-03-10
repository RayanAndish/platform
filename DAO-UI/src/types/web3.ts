import { Contract } from 'web3-eth-contract';

export interface StakingContract extends Contract {
  methods: {
    totalStaked(): {
      call(): Promise<string>;
    };
    stakedAmount(account: string): {
      call(): Promise<string>;
    };
    getRewards(account: string): {
      call(): Promise<string>;
    };
    getCurrentAPR(): {
      call(): Promise<string>;
    };
    stake(): {
      send(options: { from: string; value: string }): Promise<void>;
    };
    unstake(): {
      send(options: { from: string }): Promise<void>;
    };
    claimRewards(): {
      send(options: { from: string }): Promise<void>;
    };
  };
}

export interface VotingContract extends Contract {
  methods: {
    getVotingPower(account: string): {
      call(): Promise<string>;
    };
    vote(proposalId: string, support: boolean): {
      send(options: { from: string }): Promise<void>;
    };
    createProposal(title: string, description: string, deadline: number): {
      send(options: { from: string }): Promise<void>;
    };
  };
} 