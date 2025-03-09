import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';
import { ProposalSchema } from './schemas/proposal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Proposal', schema: ProposalSchema }]),
  ],
  controllers: [ProposalController],
  providers: [ProposalService],
})
export class ProposalModule {}