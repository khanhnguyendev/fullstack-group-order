import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  restaurant_id: string;

  @Prop({ required: false })
  delivery_id: string;

  @Prop({ required: true })
  url: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

// types
export type OrderDocument = HydratedDocument<Room>;
