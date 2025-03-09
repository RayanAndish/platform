import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { DaoService } from './dao.service';
import { CreateProposalDto } from './dto/create-proposal.dto'; // Import CreateProposalDto
import { AuthGuard } from '../auth/auth.guard'; // Import AuthGuard
import { Public } from '../auth/decorators/public.decorator';

@Controller('dao')
export class DaoController {
  constructor(private readonly daoService: DaoService) {}

  // Endpoint: دریافت اطلاعات DAO مربوط به یک پروژه خاص
  @Public() // این مسیر نیازی به احراز هویت ندارد
  @Get(':projectId/info') // دریافت اطلاعات DAO با استفاده از projectId
  async getDAOInfo(@Param('projectId') projectId: string) {
    return this.daoService.getDAOInfo(projectId);
  }

  // Endpoint: ایجاد یک پروپوزال جدید در DAO
  @UseGuards(AuthGuard) // محافظت از مسیر با AuthGuard (برای کاربران احراز هویت شده)
  @Post(':projectId/proposals') // ایجاد پروپوزال جدید برای یک پروژه خاص
  async createProposal(
    @Param('projectId') projectId: string,
    @Body() createProposalDto: CreateProposalDto
  ) {
    return this.daoService.createProposal(projectId, createProposalDto);
  }

  // Endpoint: دریافت لیست پروپوزال‌های یک DAO
  @Public()
  @Get(':projectId/proposals') // دریافت لیست پروپوزال‌های یک پروژه خاص
  async getProposals(@Param('projectId') projectId: string) {
    return this.daoService.getProposals(projectId);
  }

  // Endpoint: رأی دادن به یک پروپوزال
  @UseGuards(AuthGuard)
  @Post(':projectId/proposals/:proposalId/vote') // رأی دادن به یک پروپوزال خاص
  async voteOnProposal(
    @Param('projectId') projectId: string,
    @Param('proposalId') proposalId: string,
    @Body() voteData: { userId: string; vote: string } // دریافت اطلاعات رأی
  ) {
    return this.daoService.voteOnProposal(projectId, proposalId, voteData);
  }

  // Endpoint: دریافت نتیجه یک پروپوزال
  @Public()
  @Get(':projectId/proposals/:proposalId/results') // دریافت نتیجه پروپوزال خاص
  async getProposalResults(
    @Param('projectId') projectId: string,
    @Param('proposalId') proposalId: string
  ) {
    return this.daoService.getProposalResults(projectId, proposalId);
  }
}