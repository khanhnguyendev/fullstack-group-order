import { Module } from '@nestjs/common';
import { Room, RoomSchema } from './room.schema';
import { RoomService } from './room.service';
import { RoomGateway } from './room.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomController } from './room.controller';
import { ShopeefoodModule } from 'src/modules/shopeefood/shopeefood.module';
import {
  Restaurant,
  RestaurantSchema,
} from 'src/modules/restaurant/restaurant.schema';
import { Dish, DishSchema } from '../dish/dish.schema';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: RoomSchema, name: Room.name },
      { schema: RestaurantSchema, name: Restaurant.name },
      { schema: DishSchema, name: Dish.name },
    ]),
    SocketModule,
    ShopeefoodModule,
  ],
  controllers: [RoomController],
  providers: [RoomService, RoomGateway],
})
export class RoomModule {}
