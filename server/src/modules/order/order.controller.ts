import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';
import { ResponseUtil, SuccessResponse } from '@common/utils/response.util';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':room_id')
  async findAllByRoomId(
    @Param('room_id') room_id: string,
  ): Promise<SuccessResponse<Order[]>> {
    const orders = await this.orderService.getAllByRoomId(room_id);
    return ResponseUtil.success(orders);
  }

  @Post()
  async create(@Body() orderData: Order): Promise<SuccessResponse<Order>> {
    const order = await this.orderService.create(orderData);
    return ResponseUtil.success(order);
  }
}
