import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { Proposal } from './interfaces/proposal.interfaces';

@Controller('proposal')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get()
  async getProposals(): Promise<Proposal[]> {
    return this.proposalService.getProposals();
  }

  @Post()
  async createProposal(@Body() createProposalDto: Proposal): Promise<Proposal> {
    return this.proposalService.createProposal(createProposalDto);
  }
}