import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CompanyDocument = Company & Document;

@Schema({
  timestamps: true,
})
export class Company {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 'inactive' })
  status: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
