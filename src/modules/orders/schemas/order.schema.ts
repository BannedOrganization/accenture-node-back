import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderDocument = Order & Document;

type status = 'active' | 'delivered' | 'done' | 'inactive';

@Schema({
  timestamps: true,
})
export class Order {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  amount: number;

  @Prop({ default: null })
  contactId: Types.ObjectId;

  @Prop({ default: null })
  companyId: Types.ObjectId;

  @Prop({ default: 'inactive' })
  status: status;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
