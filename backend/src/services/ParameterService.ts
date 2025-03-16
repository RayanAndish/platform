import { ethers } from 'ethers';
import { ContractParameters, helpers } from '../../types/ContractParameters';
import { PrismaClient } from '@prisma/client';
import { Cache } from '../utils/cache';
import ContractParametersABI from '../../contracts/artifacts/contracts/parameters/ContractParameters.sol/ContractParameters.json';

export class ParameterService {
  private contract: ethers.Contract;
  private prisma: PrismaClient;
  private cache: Cache;

  constructor(
    contractAddress: string,
    provider: ethers.providers.Provider,
    prisma: PrismaClient,
    cache: Cache
  ) {
    this.contract = new ethers.Contract(
      contractAddress,
      ContractParametersABI.abi,
      provider
    );
    this.prisma = prisma;
    this.cache = cache;
  }

  /**
   * دریافت پارامترها از قرارداد هوشمند
   */
  async getContractParameters(): Promise<ContractParameters> {
    // تلاش برای دریافت از کش
    const cachedParams = await this.cache.get('contract_parameters');
    if (cachedParams) {
      return JSON.parse(cachedParams);
    }

    // دریافت از قرارداد
    const [
      tokenParams,
      stakingParams,
      votingParams,
      financeParams,
      daoParams,
      projectParams,
      consensusParams
    ] = await Promise.all([
      this.contract.getTokenParams(),
      this.contract.getStakingParams(),
      this.contract.getVotingParams(),
      this.contract.getFinanceParams(),
      this.contract.getDAOParams(),
      this.contract.getProjectParams(),
      this.contract.getConsensusParams()
    ]);

    const params: ContractParameters = {
      token: this.formatTokenParams(tokenParams),
      staking: this.formatStakingParams(stakingParams),
      voting: this.formatVotingParams(votingParams),
      finance: this.formatFinanceParams(financeParams),
      dao: this.formatDAOParams(daoParams),
      project: this.formatProjectParams(projectParams),
      consensus: this.formatConsensusParams(consensusParams)
    };

    // ذخیره در کش
    await this.cache.set('contract_parameters', JSON.stringify(params), 3600); // 1 ساعت

    return params;
  }

  /**
   * ذخیره پارامترها در دیتابیس
   */
  async saveParametersHistory(params: ContractParameters, txHash: string): Promise<void> {
    await this.prisma.parameterHistory.create({
      data: {
        parameters: params,
        transactionHash: txHash,
        timestamp: new Date()
      }
    });
  }

  /**
   * به‌روزرسانی پارامترها در قرارداد
   */
  async updateParameters(
    params: Partial<ContractParameters>,
    signer: ethers.Signer
  ): Promise<void> {
    const contractWithSigner = this.contract.connect(signer);

    if (params.token) {
      const tx = await contractWithSigner.updateTokenParams(params.token);
      await tx.wait();
      await this.saveParametersHistory({ token: params.token } as ContractParameters, tx.hash);
    }

    if (params.staking) {
      const tx = await contractWithSigner.updateStakingParams(params.staking);
      await tx.wait();
      await this.saveParametersHistory({ staking: params.staking } as ContractParameters, tx.hash);
    }

    // حذف از کش برای به‌روزرسانی در درخواست بعدی
    await this.cache.del('contract_parameters');
  }

  /**
   * اعتبارسنجی پارامترها
   */
  validateParameters(params: Partial<ContractParameters>): boolean {
    if (params.token) {
      if (!this.validateTokenParams(params.token)) return false;
    }
    if (params.staking) {
      if (!this.validateStakingParams(params.staking)) return false;
    }
    if (params.voting) {
      if (!this.validateVotingParams(params.voting)) return false;
    }
    if (params.finance) {
      if (!this.validateFinanceParams(params.finance)) return false;
    }
    if (params.dao) {
      if (!this.validateDAOParams(params.dao)) return false;
    }
    if (params.project) {
      if (!this.validateProjectParams(params.project)) return false;
    }
    if (params.consensus) {
      if (!this.validateConsensusParams(params.consensus)) return false;
    }
    return true;
  }

  // توابع کمکی برای فرمت‌بندی پارامترها
  private formatTokenParams(params: any): TokenParams {
    return {
      initialSupply: params.initialSupply,
      maxSupply: params.maxSupply,
      minTransferAmount: params.minTransferAmount,
      maxTransferAmount: params.maxTransferAmount,
      transferFee: params.transferFee.toNumber(),
      burnRate: params.burnRate.toNumber(),
      transfersPaused: params.transfersPaused
    };
  }

  // توابع اعتبارسنجی پارامترها
  private validateTokenParams(params: TokenParams): boolean {
    if (params.transferFee > 1000) return false; // حداکثر 100%
    if (params.burnRate > 1000) return false; // حداکثر 100%
    if (params.minTransferAmount.gt(params.maxTransferAmount)) return false;
    return true;
  }

  // سایر توابع فرمت‌بندی و اعتبارسنجی برای سایر پارامترها
  // ...
} 