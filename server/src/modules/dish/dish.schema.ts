import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
class Price {
  @Prop({ required: false })
  text: string;

  @Prop({ required: false })
  unit: string;

  @Prop({ required: true })
  value: number;
}

const PriceSchema = SchemaFactory.createForClass(Price);

@Schema()
class Photo {
  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  height: number;
}

const PhotoSchema = SchemaFactory.createForClass(Photo);

@Schema()
class OptionItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  weight: number;

  @Prop({ type: PriceSchema, required: true })
  ntop_price: Price;

  @Prop({ required: true })
  max_quantity: number;

  @Prop({ required: true })
  is_default: boolean;

  @Prop({ required: true })
  top_order: number;

  @Prop({ type: PriceSchema, required: true })
  price: Price;
}

const OptionItemSchema = SchemaFactory.createForClass(OptionItem);

@Schema()
class OptionItems {
  @Prop({ required: true })
  min_select: number;

  @Prop({ required: true })
  max_select: number;

  @Prop({ type: [OptionItemSchema], required: true })
  items: OptionItem[];
}

const OptionItemsSchema = SchemaFactory.createForClass(OptionItems);

@Schema()
class Option {
  @Prop({ required: false })
  ntop: string;

  @Prop({ required: false })
  mandatory: boolean;

  @Prop({ required: false })
  id: number;

  @Prop({ type: OptionItemsSchema, required: false })
  option_items: OptionItems;

  @Prop({ required: false })
  name: string;
}

const OptionSchema = SchemaFactory.createForClass(Option);

@Schema()
class Time {
  @Prop({ required: true })
  available: [];

  @Prop({
    required: true,
    type: [{ start: String, week_day: Number, end: String }],
  })
  week_days: {
    start: string;
    week_day: number;
    end: string;
  }[];

  @Prop({ required: true })
  not_available: [];
}

const TimeSchema = SchemaFactory.createForClass(Time);

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

  @Prop({ type: PriceSchema, required: true })
  price: Price;

  @Prop({ type: PriceSchema })
  discount_price?: Price;

  @Prop({ required: true })
  is_active: boolean;

  @Prop({ required: true })
  total_like: string;

  @Prop({ type: [String] })
  properties?: string[];

  @Prop({ type: [PhotoSchema] })
  photos?: Photo[];

  @Prop({ type: [OptionSchema] })
  options?: Option[];

  @Prop({ required: true })
  is_available: boolean;

  @Prop({ required: true })
  is_group_discount_item: boolean;

  @Prop({ type: TimeSchema, required: true })
  time: Time;

  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  display_order: number;

  @Prop({ required: false })
  mms_image: string;

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
