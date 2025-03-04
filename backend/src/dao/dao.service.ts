import { Injectable, NotFoundException } from '@nestjs/common';
import { Client, Context, ContextParams} from '@aragon/sdk-client';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dao, DaoDocument } from './schemas/dao.schema';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { ethers } from 'ethers';
import { Wallet } from '@ethersproject/wallet';
import { JsonRpcProvider } from '@ethersproject/providers';

@Injectable()
export class DaoService {
    private readonly client: Client;
    private readonly chainId: number;
    private readonly rpcUrl: string;
    private readonly privateKey : string

    constructor(
        private readonly configService: ConfigService,
        @InjectModel(Dao.name) private daoModel: Model<DaoDocument>
    ) {
        this.chainId = parseInt(process.env.CHAIN_ID || '5', 10);
        this.rpcUrl = process.env.RPC_URL || 'http://172.16.22.120:9545'
        this.privateKey =  process.env.PRIVATE_KEY ?? "0x0ae954fade8cb946d4a503e6d423706ac622548760de3167e35a83bd6740ace9"

        // Set up the provider and signer using ethers
        const pk = this.privateKey
        const provider = new JsonRpcProvider(this.rpcUrl);
        const signer = new Wallet(pk, provider);

        // Create the Aragon SDK client context
        const contextParams: ContextParams = {
            network:  this.chainId === 5777 ? "local" : (this.chainId === 5 ? "goerli" : (this.chainId === 11155111 ? "sepolia" : "goerli")),
            web3Providers: this.rpcUrl,
            signer: signer,
        };
        const context: Context = new Context(contextParams);

        // Create the Aragon SDK client instance
        this.client = new Client(context);
    }

    async getDAOInfo(projectId: string): Promise<any> {
      try {
          const daoAddress = "0xE628a333fD7fb07fA8BA9c27EB4a0A2c0B4fFB7f";
          const dao = await this.client.methods.getDao(daoAddress);
          return dao;

      } catch (error) {
          console.error('Error getting DAO info:', error);
          throw error;
      }
    }

    async createProposal(projectId: string, createProposalDto: CreateProposalDto): Promise<any> {
        return { message: 'Proposal created successfully!' };
    }    
}