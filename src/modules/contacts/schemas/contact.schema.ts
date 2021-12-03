import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ContactDocument = Contact & Document;

type status = 'active' | 'inactive';

@Schema({
  timestamps: true,
})
export class Contact {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ default: null })
  companyId: Types.ObjectId;

  @Prop({ default: 'inactive' })
  status: status;

  @Prop({ default: null })
  carNumber: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
