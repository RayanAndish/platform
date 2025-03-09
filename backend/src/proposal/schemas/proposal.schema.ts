import { Schema } from 'mongoose';

export const ProposalSchema = new Schema({
  title: String,
  description: String,
  votes: Number,
  status: String,
});