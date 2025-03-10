import { Module } from '@nestjs/common';
import { StakingController } from './staking.controller';
import { BlockchainService } from '../common/services/blockchain.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [StakingController],
  providers: [BlockchainService],
  exports: [BlockchainService],
})
export class StakingModule {} 