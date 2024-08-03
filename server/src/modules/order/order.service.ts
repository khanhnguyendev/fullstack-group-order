import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { OrderGateway } from './order.gateway';
import { BadRequestException } from '@common/exceptions/types/bad-request.exception';
import { Dish } from '@modules/dish/dish.schema';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Dish.name) private dishModel: Model<Dish>,
    private orderGateway: OrderGateway,
  ) {}

  async getAllByRoomId(room_id: string): Promise<Order[]> {
    try {
      return await this.orderModel.find({ room_id }).exec();
    } catch (error) {
      this.logger.error('Failed to get orders by room ID', error.stack);
      throw error;
    }
  }

  async create(orderData: Order): Promise<Order> {
    try {
      this.logger.log(`Creating order: ${JSON.stringify(orderData)}`);

      const { dish_id, topping_id } = orderData;
      if (!dish_id) {
        throw new BadRequestException('Dish ID is required');
      }

      const dish = await this.dishModel.findById(dish_id);
      if (!dish) {
        throw new BadRequestException('Dish not found');
      }

      if (topping_id) {
        // TODO: Check if topping exists
      }

      const order: Order = {
        ...orderData,
        price: dish.price.value,
        restaurant_id: dish.restaurant_id,
      };

      const newOrder = await this.orderModel.create(order);
      await newOrder.save();
      this.logger.log(`Order created with ID: ${newOrder._id}`);

      this.orderGateway.notifyToRoom(
        'order-added',
        orderData.room_id,
        newOrder,
      );

      return newOrder;
    } catch (error) {
      this.logger.error('Failed to create order', error.stack);
      throw error;
    }
  }
}
