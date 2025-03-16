import { BrowserProvider, JsonRpcSigner, Contract, formatEther } from 'ethers';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import stakingAbi from '../abis/staking.json';
import votingAbi from '../abis/voting.json';

export class Web3Service {
  private web3Modal: Web3Modal;
  private provider: BrowserProvider | null = null;
  private signer: JsonRpcSigner | null = null;
  private stakingContract: Contract | null = null;
  private votingContract: Contract | null = null;

  constructor() {
    this.web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions: {}
    });
  }

  async connect() {
    try {
      const provider = await this.web3Modal.connect();
      this.provider = new BrowserProvider(provider);
      this.signer = await this.provider.getSigner();
      await this.initializeContracts();
      return true;
    } catch (error) {
      console.error('Error connecting to Web3:', error);
      return false;
    }
  }

  async disconnect() {
    try {
      await this.web3Modal.clearCachedProvider();
      this.provider = null;
      this.signer = null;
      this.stakingContract = null;
      this.votingContract = null;
    } catch (error) {
      console.error('Error disconnecting from Web3:', error);
    }
  }

  private async initializeContracts() {
    if (!this.signer) return;

    const stakingAddress = process.env.REACT_APP_STAKING_CONTRACT_ADDRESS;
    const votingAddress = process.env.REACT_APP_VOTING_CONTRACT_ADDRESS;

    if (stakingAddress) {
      this.stakingContract = new Contract(stakingAddress, stakingAbi, this.signer);
    }

    if (votingAddress) {
      this.votingContract = new Contract(votingAddress, votingAbi, this.signer);
    }
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized');
    try {
      const balance = await this.provider.getBalance(address);
      return formatEther(balance);
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  }

  async stake(amount: string): Promise<boolean> {
    if (!this.stakingContract) throw new Error('Staking contract not initialized');
    try {
      const tx = await this.stakingContract.stake({ value: amount });
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error staking:', error);
      return false;
    }
  }

  async unstake(amount: string): Promise<boolean> {
    if (!this.stakingContract) throw new Error('Staking contract not initialized');
    try {
      const tx = await this.stakingContract.unstake(amount);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error unstaking:', error);
      return false;
    }
  }

  async vote(proposalId: number, support: boolean): Promise<boolean> {
    if (!this.votingContract) throw new Error('Voting contract not initialized');
    try {
      const tx = await this.votingContract.vote(proposalId, support);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error voting:', error);
      return false;
    }
  }

  async getVotingPower(address: string): Promise<string> {
    if (!this.votingContract) throw new Error('Voting contract not initialized');
    try {
      const power = await this.votingContract.getVotingPower(address);
      return formatEther(power);
    } catch (error) {
      console.error('Error getting voting power:', error);
      return '0';
    }
  }

  async getAddress(): Promise<string> {
    if (!this.signer) throw new Error('Signer not initialized');
    return await this.signer.getAddress();
  }

  async getSigner() {
    if (!this.signer) throw new Error('Signer not initialized');
    return this.signer;
  }

  async getStakingInfo(address: string) {
    if (!this.stakingContract) throw new Error('Staking contract not initialized');
    try {
      return await this.stakingContract.getStakingInfo(address);
    } catch (error) {
      console.error('Error getting staking info:', error);
      throw error;
    }
  }

  async getProposalDetails(proposalId: number) {
    if (!this.votingContract) throw new Error('Voting contract not initialized');
    try {
      const proposal = await this.votingContract.getProposal(proposalId);
      return {
        title: proposal.title,
        description: proposal.description,
        votesFor: proposal.votesFor.toString(),
        votesAgainst: proposal.votesAgainst.toString(),
        deadline: Number(proposal.deadline),
        executed: proposal.executed,
        creator: proposal.creator
      };
    } catch (error) {
      console.error('Error getting proposal details:', error);
      throw error;
    }
  }
}

export const web3Service = new Web3Service(); 