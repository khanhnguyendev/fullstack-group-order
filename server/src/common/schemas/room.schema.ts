import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  restaurant_id: string;

  @Prop({ required: true })
  delivery_id: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  created_by: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

// types
export type RoomDocument = HydratedDocument<Room>;
