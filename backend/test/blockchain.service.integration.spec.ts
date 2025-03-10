import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BlockchainService } from '../src/common/services/blockchain.service';
import { ethers } from 'ethers';

describe('BlockchainService Integration Tests', () => {
  let service: BlockchainService;
  let provider: ethers.JsonRpcProvider;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockchainService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config = {
                'BLOCKCHAIN_RPC_URL': 'http://172.16.22.120:9545',
                'CHAIN_ID': '5777',
                'NETWORK_NAME': 'DAO-VC',
                'GAS_LIMIT': '8000000',
                'GAS_PRICE': '20000000000',
                'STAKING_CONTRACT_ADDRESS': '0x1234567890123456789012345678901234567890',
                'VOTING_CONTRACT_ADDRESS': '0x0987654321098765432109876543210987654321',
                'DAO_CONTRACT_ADDRESS': '0xabcdef1234567890abcdef1234567890abcdef12',
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<BlockchainService>(BlockchainService);
    provider = new ethers.JsonRpcProvider('http://172.16.22.120:9545');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Ganache Connection', () => {
    it('should connect to Ganache network', async () => {
      const network = await provider.getNetwork();
      expect(network.chainId).toBe(5777n);
      expect(network.name).toBe('ganache');
    });

    it('should have accounts available', async () => {
      const accounts = await provider.listAccounts();
      expect(accounts.length).toBeGreaterThan(0);
    });
  });

  describe('Staking Operations', () => {
    it('should get staking info', async () => {
      const accounts = await provider.listAccounts();
      const stakingInfo = await service.getStakingInfo(accounts[0].address);
      expect(stakingInfo).toHaveProperty('totalStaked');
      expect(stakingInfo).toHaveProperty('userStake');
      expect(stakingInfo).toHaveProperty('rewards');
      expect(stakingInfo).toHaveProperty('apr');
    });

    it('should stake tokens', async () => {
      const amount = '0.1';
      const receipt = await service.stake(amount);
      expect(receipt).toHaveProperty('hash');
      expect(receipt.status).toBe(1);
    });

    it('should unstake tokens', async () => {
      const amount = '0.1';
      const receipt = await service.unstake(amount);
      expect(receipt).toHaveProperty('hash');
      expect(receipt.status).toBe(1);
    });

    it('should claim rewards', async () => {
      const accounts = await provider.listAccounts();
      const receipt = await service.claimRewards(accounts[0].address);
      expect(receipt).toHaveProperty('hash');
      expect(receipt.status).toBe(1);
    });
  });

  describe('Balance Operations', () => {
    it('should get balance', async () => {
      const accounts = await provider.listAccounts();
      const balance = await service.getBalance(accounts[0].address);
      expect(typeof balance).toBe('string');
      expect(parseFloat(balance)).toBeGreaterThanOrEqual(0);
    });
  });

  describe('DAO Operations', () => {
    it('should get DAO info', async () => {
      const daoAddress = '0xabcdef1234567890abcdef1234567890abcdef12';
      const dao = await service.getDAO(daoAddress);
      expect(dao).toBeDefined();
    });

    it('should create proposal', async () => {
      const daoAddress = '0xabcdef1234567890abcdef1234567890abcdef12';
      const metadata = {
        title: 'Test Proposal',
        description: 'This is a test proposal',
      };
      const proposal = await service.createProposal(daoAddress, metadata);
      expect(proposal).toBeDefined();
    });

    it('should vote on proposal', async () => {
      const proposalId = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12';
      const result = await service.vote(proposalId, true);
      expect(result).toBeDefined();
    });
  });
}); 