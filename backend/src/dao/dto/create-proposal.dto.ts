import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProposalDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}