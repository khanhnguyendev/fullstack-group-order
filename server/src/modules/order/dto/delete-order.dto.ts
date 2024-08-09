import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteOrderDto {
  @IsNotEmpty()
  @IsString()
  _id: string;
}
