import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dish } from './dish.schema';
import { Model } from 'mongoose';

@Injectable()
export class DishService {
  private readonly logger = new Logger(DishService.name);

  constructor(
    @InjectModel(Dish.name)
    private readonly dishModel: Model<Dish>,
  ) {}

  async findAllByRoomId(room_id: string) {
    try {
      const dishes = await this.dishModel.find({ room_id }).exec();
      if (!dishes) {
        this.logger.warn(`No dishes found for room ${room_id}`);
        return [];
      }
      return dishes;
    } catch (error) {
      this.logger.error(
        `Failed to fetch dishes for room ${room_id}`,
        error.stack,
      );
      throw error;
    }
  }
}
