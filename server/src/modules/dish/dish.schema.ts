import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface Price {
  text?: string;
  unit?: string;
  value: number;
}

export interface Photo {
  width: number;
  value: string;
  height: number;
}

export interface OptionItem {
  name: string;
  weight: number;
  ntop_price: Price;
  max_quantity: number;
  is_default: boolean;
  top_order: number;
  price: Price;
}

export interface OptionItems {
  min_select: number;
  max_select: number;
  items: OptionItem[];
}

export interface Option {
  ntop?: string;
  mandatory?: boolean;
  id?: number;
  option_items?: OptionItems;
  name?: string;
}

export interface Time {
  available: any[];
  week_days: {
    start: string;
    week_day: number;
    end: string;
  }[];
  not_available: any[];
}

@Schema()
export class Dish {
  @Prop({ required: true })
  room_id: string;

  @Prop({ required: true })
  restaurant_id: number;

  @Prop({ required: true })
  delivery_id: number;

  @Prop({ required: true })
  is_deleted: boolean;

  @Prop()
  description?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, required: true })
  price: Price;

  @Prop({ type: Object })
  discount_price?: Price;

  @Prop({ required: true })
  is_active: boolean;

  @Prop({ required: true })
  total_like: string;

  @Prop({ type: [String] })
  properties?: string[];

  @Prop({ type: [Object] })
  photos?: Photo[];

  @Prop({ type: [Object] })
  options?: Option[];

  @Prop({ required: true })
  is_available: boolean;

  @Prop({ required: true })
  is_group_discount_item: boolean;

  @Prop({ type: Object, required: true })
  time: Time;

  @Prop({ required: true })
  dish_id: number;

  @Prop({ required: true })
  display_order: number;

  @Prop({ required: false })
  mms_image?: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  dish_type_id: number;

  @Prop({ required: true })
  dish_type_name: string;
}

export const DishSchema = SchemaFactory.createForClass(Dish);

// types
export type DishDocument = Dish & Document;
