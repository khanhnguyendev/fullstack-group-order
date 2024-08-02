import * as dotenv from 'dotenv';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './modules/room/room.module';
import { ShopeefoodModule } from './modules/shopeefood/shopeefood.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { DishModule } from './modules/dish/dish.module';
import { SocketModule } from './modules/socket/socket.module';
import { LoggingMiddleware } from './common/logging/logging.middleware';
import { OrderModule } from '@modules/order/order.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    RoomModule,
    ShopeefoodModule,
    RestaurantModule,
    DishModule,
    OrderModule,
    SocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
