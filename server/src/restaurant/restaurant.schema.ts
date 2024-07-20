import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface IPhoto {
  width?: number;
  value?: string;
  height?: number;
}

export interface IRating {
  total_review?: number;
  avg?: number;
  display_total_review?: string;
  app_link?: string;
}

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true })
  restaurant_id: number;

  @Prop({ required: true })
  delivery_id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  restaurant_url: string;

  @Prop({
    type: [{ width: Number, value: String, height: Number }],
    default: [],
  })
  photos: IPhoto[];

  @Prop({ required: true })
  address: string;

  @Prop({
    type: {
      total_review: { type: Number, default: 0 },
      avg: { type: Number, default: 0 },
      display_total_review: { type: String },
      app_link: { type: String },
    },
    default: {},
  })
  rating: IRating;

  @Prop({ default: 0 })
  total_order: number;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

export type RestaurantDocument = HydratedDocument<Restaurant>;
