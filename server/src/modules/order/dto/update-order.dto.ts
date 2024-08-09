import { IsNotEmpty, IsString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  _id: string;
}
