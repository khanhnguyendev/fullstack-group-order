import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class RefreshToken {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expires: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

// types
export type RefreshTokenDocument = HydratedDocument<RefreshToken>;
