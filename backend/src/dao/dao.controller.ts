// src/dao/dao.controller.ts
import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { DaoService } from './dao.service';
import { CreateProposalDto } from './dto/create-proposal.dto'; // Import CreateProposalDto
import { AuthGuard } from '../auth/auth.guard'; // Import AuthGuard (if you are using authentication)
import { Public } from '../auth/decorators/public.decorator';

@Controller('dao')
export class DaoController {
  constructor(private readonly daoService: DaoService) {}

  @Public() //  Or UseGuards(AuthGuard) if you need authentication
  @Get(':projectId/info') //  get DAO info using the project ID
  async getDAOInfo(@Param('projectId') projectId: string) {
    return this.daoService.getDAOInfo(projectId);
  }

  @UseGuards(AuthGuard) // Protect the route with the AuthGuard
  @Post(':projectId/proposals') // create a new proposal (for authenticated users)
  async createProposal(
    @Param('projectId') projectId: string,
    @Body() createProposalDto: CreateProposalDto
  ) {
    return this.daoService.createProposal(projectId, createProposalDto);
  }
  // Add other controller methods for:
  //  - get proposals
  //  - vote on a proposal
  //  - get proposal results
  //  ...
}