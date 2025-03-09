import { Injectable } from '@nestjs/common';
import { Proposal } from './interfaces/proposal.interfaces';

@Injectable()
export class ProposalService {
  private proposals: Proposal[] = []; // تعریف نوع داده برای آرایه

  async getProposals(): Promise<Proposal[]> {
    return this.proposals;
  }

  async createProposal(proposal: Proposal): Promise<Proposal> {
    this.proposals.push(proposal);
    return proposal;
  }
}