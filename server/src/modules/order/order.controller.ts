import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';
import { ResponseUtil, SuccessResponse } from '@common/utils/response.util';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(): Promise<SuccessResponse<Order[]>> {
    const orders = await this.orderService.getAll();
    return ResponseUtil.success(orders);
  }

  @Post()
  async create(@Body() orderData: Order): Promise<SuccessResponse<Order>> {
    const order = await this.orderService.create(orderData);
    return ResponseUtil.success(order);
  }
}
