import { Body, Controller, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant.schema';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  // @Post()
  // async create(@Body() data: Restaurant): Promise<Restaurant> {
  //   return this.restaurantService.create(data);
  // }
}
