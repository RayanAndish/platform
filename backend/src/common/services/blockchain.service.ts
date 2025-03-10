import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { Client, Context, ContextParams } from '@aragon/sdk-client';

interface GanacheConfig {
  name: string;
  chainId: number;
  gasLimit: number;
  gasPrice: number;
}

@Injectable()
export class BlockchainService implements OnModuleInit {
  private provider: ethers.JsonRpcProvider;
  private client: Client;
  private signer: ethers.Signer;
  private ganacheConfig: GanacheConfig;

  constructor(private configService: ConfigService) {
    this.ganacheConfig = {
      name: this.configService.get<string>('NETWORK_NAME') || 'ganache',
      chainId: Number(this.configService.get<string>('CHAIN_ID')) || 1337,
      gasLimit: Number(this.configService.get<string>('GAS_LIMIT')) || 8000000,
      gasPrice: Number(this.configService.get<string>('GAS_PRICE')) || 20000000000,
    };
  }

  async onModuleInit() {
    await this.initializeProvider();
    await this.initializeAragonClient();
  }

  private async initializeProvider() {
    const rpcUrl = this.configService.get<string>('BLOCKCHAIN_RPC_URL');
    if (!rpcUrl) {
      throw new Error('BLOCKCHAIN_RPC_URL is not defined');
    }
    
    // Initialize provider with Ganache settings
    this.provider = new ethers.JsonRpcProvider(rpcUrl, {
      name: this.ganacheConfig.name,
      chainId: this.ganacheConfig.chainId,
    });

    // Get the first account from Ganache as default signer
    const accounts = await this.provider.listAccounts();
    if (accounts.length === 0) {
      throw new Error('No accounts found in Ganache');
    }
    
    // Create a wallet instance for the first account
    this.signer = await this.provider.getSigner(accounts[0].address);
  }

  private async initializeAragonClient() {
    const rpcUrl = this.configService.get<string>('BLOCKCHAIN_RPC_URL');
    if (!rpcUrl) {
      throw new Error('Missing blockchain configuration');
    }

    const context: ContextParams = {
      network: this.ganacheConfig.chainId,
      signer: this.signer as any, // Type assertion to fix compatibility issue
      web3Providers: [rpcUrl],
    };

    this.client = new Client(new Context(context));
  }

  public async getDAO(daoAddress: string) {
    try {
      const dao = await this.client.methods.getDao(daoAddress);
      return dao;
    } catch (error) {
      throw new Error(`Failed to get DAO: ${error.message}`);
    }
  }

  public async createProposal(daoAddress: string, metadata: any) {
    try {
      // Note: This is a placeholder implementation
      // The actual implementation will depend on the Aragon SDK version and methods available
      throw new Error('createProposal method not implemented');
    } catch (error) {
      throw new Error(`Failed to create proposal: ${error.message}`);
    }
  }

  public async vote(proposalId: string, vote: boolean) {
    try {
      // Note: This is a placeholder implementation
      // The actual implementation will depend on the Aragon SDK version and methods available
      throw new Error('vote method not implemented');
    } catch (error) {
      throw new Error(`Failed to vote: ${error.message}`);
    }
  }

  public async stake(amount: string) {
    try {
      const stakingAddress = this.configService.get<string>('STAKING_CONTRACT_ADDRESS');
      if (!stakingAddress) {
        throw new Error('STAKING_CONTRACT_ADDRESS is not defined');
      }

      const stakingContract = new ethers.Contract(
        stakingAddress,
        ['function stake(uint256 amount)'],
        this.signer
      );

      // Convert amount to Wei before sending transaction
      const amountInWei = ethers.parseEther(amount);
      const tx = await stakingContract.stake(amountInWei, {
        gasLimit: this.ganacheConfig.gasLimit,
        gasPrice: this.ganacheConfig.gasPrice,
      });
      
      // Wait for transaction confirmation
      const receipt = await tx.wait();
      console.log(`Stake transaction confirmed: ${receipt.hash}`);
      
      return receipt;
    } catch (error) {
      console.error('Stake error:', error);
      throw new Error(`Failed to stake: ${error.message}`);
    }
  }

  public async unstake(amount: string) {
    try {
      const stakingAddress = this.configService.get<string>('STAKING_CONTRACT_ADDRESS');
      if (!stakingAddress) {
        throw new Error('STAKING_CONTRACT_ADDRESS is not defined');
      }

      const stakingContract = new ethers.Contract(
        stakingAddress,
        ['function unstake(uint256 amount)'],
        this.signer
      );

      // Convert amount to Wei before sending transaction
      const amountInWei = ethers.parseEther(amount);
      const tx = await stakingContract.unstake(amountInWei, {
        gasLimit: this.ganacheConfig.gasLimit,
        gasPrice: this.ganacheConfig.gasPrice,
      });
      
      // Wait for transaction confirmation
      const receipt = await tx.wait();
      console.log(`Unstake transaction confirmed: ${receipt.hash}`);
      
      return receipt;
    } catch (error) {
      console.error('Unstake error:', error);
      throw new Error(`Failed to unstake: ${error.message}`);
    }
  }

  public async claimRewards(address: string) {
    try {
      const stakingAddress = this.configService.get<string>('STAKING_CONTRACT_ADDRESS');
      if (!stakingAddress) {
        throw new Error('STAKING_CONTRACT_ADDRESS is not defined');
      }

      const stakingContract = new ethers.Contract(
        stakingAddress,
        ['function claimRewards()'],
        this.signer
      );

      const tx = await stakingContract.claimRewards({
        gasLimit: this.ganacheConfig.gasLimit,
        gasPrice: this.ganacheConfig.gasPrice,
      });
      
      // Wait for transaction confirmation
      const receipt = await tx.wait();
      console.log(`Claim rewards transaction confirmed: ${receipt.hash}`);
      
      return receipt;
    } catch (error) {
      console.error('Claim rewards error:', error);
      throw new Error(`Failed to claim rewards: ${error.message}`);
    }
  }

  public async getBalance(address: string) {
    try {
      const balance = await this.provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Get balance error:', error);
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  public async getStakingInfo(address: string) {
    try {
      const stakingAddress = this.configService.get<string>('STAKING_CONTRACT_ADDRESS');
      if (!stakingAddress) {
        throw new Error('STAKING_CONTRACT_ADDRESS is not defined');
      }

      const stakingContract = new ethers.Contract(
        stakingAddress,
        [
          'function totalStaked() view returns (uint256)',
          'function stakedBalance(address) view returns (uint256)',
          'function getRewards(address) view returns (uint256)',
          'function getAPR() view returns (uint256)'
        ],
        this.provider
      );

      const [totalStaked, userStake, rewards, apr] = await Promise.all([
        stakingContract.totalStaked(),
        stakingContract.stakedBalance(address),
        stakingContract.getRewards(address),
        stakingContract.getAPR()
      ]);

      return {
        totalStaked: ethers.formatEther(totalStaked),
        userStake: ethers.formatEther(userStake),
        rewards: ethers.formatEther(rewards),
        apr: Number(apr) / 100 // Assuming APR is stored as percentage * 100
      };
    } catch (error) {
      console.error('Get staking info error:', error);
      throw new Error(`Failed to get staking info: ${error.message}`);
    }
  }
} 