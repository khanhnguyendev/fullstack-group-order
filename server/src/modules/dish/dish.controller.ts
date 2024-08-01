import { Controller, Get, Param } from '@nestjs/common';
import { DishService } from './dish.service';
import { ResponseUtil, SuccessResponse } from '@common/utils/response.util';
import { Dish } from './dish.schema';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get(':room_id')
  async findAllByRoomId(
    @Param('room_id') room_id: string,
  ): Promise<SuccessResponse<Dish[]>> {
    const dishes = await this.dishService.findAllByRoomId(room_id);
    return ResponseUtil.success(dishes);
  }
}
