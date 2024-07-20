import { Controller, Get, Param } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get(':room_id')
  async getRestaurants(@Param('room_id') room_id: string) {
    return await this.restaurantService.getRestaurant(room_id);
  }
}
