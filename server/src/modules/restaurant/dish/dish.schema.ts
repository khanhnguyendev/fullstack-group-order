import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Define the IPhoto interface
export interface IPhoto {
  width: number;
  height: number;
  value: string; // URL of the photo
}

// Define the IOptionItem interface
export interface IOptionItem {
  min_select: number;
  max_select: number;
  items: string[]; // Adjust the type if needed based on actual item structure
}

// Define the IDishOption interface
export interface IDishOption {
  ntop?: string; // Optional
  mandatory: boolean;
  id: number;
  option_items: IOptionItem;
  name: string;
}

// Define the IWeekDay interface for the time property
export interface IWeekDay {
  start: string; // Time in HH:MM format
  end: string; // Time in HH:MM format
  week_day: number; // Day of the week (1 = Monday, 7 = Sunday)
}

// Define the IDishTime interface
export interface IDishTime {
  available: string[]; // List of available times
  week_days: IWeekDay[]; // List of week days with time slots
  not_available: string[]; // List of times or days not available
}

@Schema({ timestamps: true })
export class Dish {
  @Prop({ required: true })
  dish_type_id: number;

  @Prop({ required: true })
  room_id: string;

  @Prop({ required: true })
  restaurant_id: number;

  @Prop({ required: true })
  delivery_id: number;

  @Prop({ required: true })
  dish_type_name: string;

  @Prop({
    type: {
      text: String,
      unit: String,
      value: Number,
    },
    required: false,
  })
  price: {
    text: string;
    unit: string;
    value: number;
  };

  @Prop({ default: false })
  is_deleted: boolean;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: 0 })
  display_order: number;

  @Prop({ default: '0' })
  total_like: string;

  @Prop({ type: [String], default: [] })
  properties: string[];

  @Prop({
    type: [{ width: Number, height: Number, value: String }],
    default: [],
  })
  photos: IPhoto[];

  @Prop({
    type: [
      {
        ntop: String,
        mandatory: Boolean,
        id: Number,
        option_items: {
          min_select: Number,
          max_select: Number,
          items: [String],
        },
        name: String,
      },
    ],
    default: [],
  })
  options: IDishOption[];

  @Prop({ default: true })
  is_available: boolean;

  @Prop({ default: false })
  is_group_discount_item: boolean;

  @Prop({
    type: {
      available: [String],
      week_days: [
        {
          start: String,
          end: String,
          week_day: Number,
        },
      ],
      not_available: [String],
    },
    default: {
      available: [],
      week_days: [],
      not_available: [],
    },
  })
  time: IDishTime;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: '' })
  mms_image: string;
}

export const DishSchema = SchemaFactory.createForClass(Dish);

export type DishDocument = HydratedDocument<Dish>;
