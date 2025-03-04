// src/dao/schemas/dao.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DaoDocument = Dao & Document;

@Schema()
export class Dao {
  @Prop({ required: true, unique: true })
  projectId: string;  //  Link to the project in your system

  @Prop({ required: true })
  daoAddress: string;  //  The address of the DAO contract
  // Add other DAO-related fields as needed (e.g., tokenAddress, votingSettings, etc.)
}

export const DaoSchema = SchemaFactory.createForClass(Dao);