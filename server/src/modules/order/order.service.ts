import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { OrderGateway } from './order.gateway';
import { BadRequestException } from '@common/exceptions/types/bad-request.exception';
import { Dish } from '@modules/dish/dish.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DeleteOrderDto } from './dto/delete-order.dto';

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
      const orders = await this.orderModel.find({ room_id }).exec();
      const dishes = await this.dishModel
        .find({ _id: { $in: orders.map((o) => o.dish_id) } })
        .exec();
      // return list orders with dish name
      const response = orders.map((order) => {
        const dish = dishes.find((d) => d._id.equals(order.dish_id));
        return {
          ...order.toJSON(),
          dish_name: dish?.name,
        };
      });
      return response;
    } catch (error) {
      this.logger.error('Failed to get orders by room ID', error.stack);
      throw error;
    }
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    try {
      this.logger.log(`Creating order: ${JSON.stringify(dto)}`);

      const { dish_id, topping_id } = dto;
      if (!dish_id) {
        throw new BadRequestException('Dish ID is required');
      }

      const dish = await this.dishModel.findOne({ dish_id }).exec();
      if (!dish) {
        throw new BadRequestException('Dish not found');
      }

      if (topping_id) {
        // TODO: Check if topping exists
      }

      const order = {
        ...dto,
        price: dish.price.value,
        restaurant_id: dish.restaurant_id,
      };

      const newOrder = await this.orderModel.create(order);
      await newOrder.save();
      this.logger.log(`Order created with ID: ${newOrder._id}`);

      const response = {
        ...newOrder.toJSON(),
        dish_name: dish.name,
        socket: {
          user: newOrder.order_by,
          event: `order@${dto.room_id}`,
          type: 'create',
          message: `${newOrder.order_by} added ${dish.name}`,
        },
      };

      this.orderGateway.notify(`order@${dto.room_id}`, response);

      return response;
    } catch (error) {
      this.logger.error('Failed to create order', error.stack);
      throw error;
    }
  }

  async update(dto: UpdateOrderDto): Promise<Order> {
    try {
      this.logger.log(`Updating order with ID: ${dto._id}`);

      const order = await this.orderModel.findOne({ _id: dto._id }).exec();
      if (!order) {
        throw new BadRequestException('Order not found');
      }
      const updatedOrder = await this.orderModel
        .findOneAndUpdate(
          { _id: dto._id },
          dto,
          { new: true }, // Return the updated document
        )
        .exec()
        .then((_doc) => _doc?.toJSON());

      if (!updatedOrder) {
        throw new BadRequestException('Failed to update order');
      }

      const response = {
        ...updatedOrder,
        socket: {
          user: order.order_by,
          event: `order@${updatedOrder.room_id}`,
          type: 'update',
          message: `${order.order_by} updated order`,
        },
      };

      this.orderGateway.notify(`order@${updatedOrder.room_id}`, response);

      return response;
    } catch (error) {
      this.logger.error('Failed to update order', error.stack);
      throw error;
    }
  }

  async delete(dto: DeleteOrderDto): Promise<Order> {
    try {
      this.logger.log(`Deleting order with ID: ${dto._id}`);

      const order = await this.orderModel.findOne({ _id: dto._id }).exec();
      if (!order) {
        throw new BadRequestException('Order not found');
      }

      const deletedOrder = await this.orderModel
        .findOneAndDelete({ _id: dto._id }, { rawResult: true })
        .exec()
        .then((_doc) => _doc?.toJSON());

      if (!deletedOrder) {
        throw new BadRequestException('Failed to delete order');
      }

      const response = {
        ...deletedOrder,
        socket: {
          user: order.order_by,
          event: `order@${deletedOrder.room_id}`,
          type: 'delete',
          message: `${order.order_by} deleted order`,
        },
      };

      this.orderGateway.notify(`order@${deletedOrder.room_id}`, response);

      return response;
    } catch (error) {
      this.logger.error('Failed to delete order', error.stack);
      throw error;
    }
  }
}
