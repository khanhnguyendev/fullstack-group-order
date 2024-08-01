import { Injectable, Logger } from '@nestjs/common';
import { Restaurant } from './restaurant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@common/exceptions/types/not-found.exception';

@Injectable()
export class RestaurantService {
  private readonly logger = new Logger(RestaurantService.name);

  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async getRestaurantByRoomId(room_id: string): Promise<Restaurant> {
    try {
      const restaurant = await this.restaurantModel.findOne({ room_id }).exec();
      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      return restaurant;
    } catch (error) {
      this.logger.error('Failed to fetch restaurants', error.stack);
      throw error;
    }
  }
}
