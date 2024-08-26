import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface RefreshToken {
  token: string;
  isUsed: boolean;
}

@Schema({ timestamps: true })
export class KeyToken {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  public_key: string;

  refresh_token: [RefreshToken];
}

export interface KeyTokenDocument extends KeyToken, Document {}

export const KeyTokenSchema = SchemaFactory.createForClass(KeyToken);
