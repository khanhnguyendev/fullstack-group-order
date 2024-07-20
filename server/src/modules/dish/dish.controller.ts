import { Controller, Get, Param } from '@nestjs/common';
import { DishService } from './dish.service';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get(':room_id')
  async findAllByRoomId(@Param('room_id') room_id: string) {
    return this.dishService.findAllByRoomId(room_id);
  }
}
