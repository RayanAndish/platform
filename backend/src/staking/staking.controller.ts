import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { BlockchainService } from '../common/services/blockchain.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('staking')
@UseGuards(AuthGuard)
export class StakingController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('info')
  async getStakingInfo(@Req() req) {
    try {
      const { address } = req.user;
      return await this.blockchainService.getStakingInfo(address);
    } catch (error) {
      throw new Error(`Failed to get staking info: ${error.message}`);
    }
  }

  @Post('stake')
  async stake(@Body() body: { amount: string }, @Req() req) {
    try {
      const { amount } = body;
      const { address } = req.user;
      return await this.blockchainService.stake(amount);
    } catch (error) {
      throw new Error(`Failed to stake: ${error.message}`);
    }
  }

  @Post('unstake')
  async unstake(@Body() body: { amount: string }, @Req() req) {
    try {
      const { amount } = body;
      const { address } = req.user;
      return await this.blockchainService.unstake(amount);
    } catch (error) {
      throw new Error(`Failed to unstake: ${error.message}`);
    }
  }

  @Post('claim-rewards')
  async claimRewards(@Req() req) {
    try {
      const { address } = req.user;
      return await this.blockchainService.claimRewards(address);
    } catch (error) {
      throw new Error(`Failed to claim rewards: ${error.message}`);
    }
  }
} 