import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { OrderGateway } from './order.gateway';
import { Dish, DishSchema } from '@modules/dish/dish.schema';
import { SocketModule } from '@modules/socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: OrderSchema, name: Order.name },
      { schema: DishSchema, name: Dish.name },
    ]),
    SocketModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderGateway],
})
export class OrderModule {}
