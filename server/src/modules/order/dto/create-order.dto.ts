import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  room_id: string;

  @IsNotEmpty()
  @IsNumber()
  restaurant_id: number;

  @IsNotEmpty()
  @IsString()
  order_by: string;

  @IsNotEmpty()
  @IsString()
  dish_id: string;

  @IsOptional()
  @IsString()
  topping_id?: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  note?: string;
}
