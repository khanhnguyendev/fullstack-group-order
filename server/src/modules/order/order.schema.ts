import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  room_id: string;

  @Prop({ required: true })
  restaurant_id: number;

  @Prop({ required: true })
  order_by: string;

  @Prop({ required: true })
  dish_id: string;

  @Prop({ required: false })
  topping_id: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  note: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// types
export type OrderDocument = HydratedDocument<Order>;
