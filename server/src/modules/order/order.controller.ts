import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '@schemas/order.schema';
import { ResponseUtil, SuccessResponse } from '@common/utils/response.util';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DeleteOrderDto } from './dto/delete-order.dto';

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

  @Post('create')
  async create(@Body() dto: CreateOrderDto): Promise<SuccessResponse<Order>> {
    const order = await this.orderService.create(dto);
    return ResponseUtil.success(order);
  }

  @Post('update')
  async update(@Body() dto: UpdateOrderDto): Promise<SuccessResponse<Order>> {
    const order = await this.orderService.update(dto);
    return ResponseUtil.success(order);
  }

  @Post('delete')
  async delete(@Body() dto: DeleteOrderDto): Promise<SuccessResponse<Order>> {
    const order = await this.orderService.delete(dto);
    return ResponseUtil.success(order);
  }
}
