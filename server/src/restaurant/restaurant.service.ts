import { Injectable, Logger } from '@nestjs/common';
import { Restaurant } from './restaurant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantService {
  private readonly logger = new Logger(RestaurantService.name);

  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  // async create(restaurantData: Restaurant): Promise<Restaurant> {
  //   try {
  //     // create new restaurant
  //     this.logger.log('Creating restaurant...');
  //     const newRestaurant = new this.restaurantModel(restaurantData);
  //     await newRestaurant.save();
  //     this.logger.log('Restaurant created:', newRestaurant);

  //     return newRestaurant;
  //   } catch (error) {
  //     this.logger.error('Error creating restaurant', error.stack);
  //     throw error;
  //   }
  // }
}
