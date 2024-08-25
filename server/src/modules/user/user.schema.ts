import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  toObject(): any {
    const { _id, __v, ...object } = this.toObject();
    object.id = _id;
    return object;
  }
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  isActivated: boolean;

  @Prop({ required: true })
  isBlocked: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;
