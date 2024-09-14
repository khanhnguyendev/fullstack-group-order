import { Controller, Get, Param, Res } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { ResponseUtil, SuccessResponse } from '@common/utils/response.util';
import { Restaurant } from '@schemas/restaurant.schema';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get(':room_id')
  async getRestaurantByRoomId(
    @Param('room_id') room_id: string,
  ): Promise<SuccessResponse<Restaurant>> {
    const restaurant =
      await this.restaurantService.getRestaurantByRoomId(room_id);
    return ResponseUtil.success(restaurant);
  }
}
