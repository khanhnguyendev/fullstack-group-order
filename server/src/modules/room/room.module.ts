import { Module } from '@nestjs/common';
import { Room, RoomSchema } from '@schemas/room.schema';
import { RoomService } from './room.service';
import { RoomGateway } from './room.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomController } from './room.controller';
import { ShopeefoodModule } from 'src/modules/shopeefood/shopeefood.module';
import { Restaurant, RestaurantSchema } from '@schemas/restaurant.schema';
import { Dish, DishSchema } from '@schemas/dish.schema';
import { SocketModule } from '../socket/socket.module';
import { UserService } from '@modules/user/user.service';
import { User, UserSchema } from '@common/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: RoomSchema, name: Room.name },
      { schema: RestaurantSchema, name: Restaurant.name },
      { schema: DishSchema, name: Dish.name },
      { schema: UserSchema, name: User.name },
    ]),
    SocketModule,
    ShopeefoodModule,
  ],
  controllers: [RoomController],
  providers: [RoomGateway, RoomService, UserService],
})
export class RoomModule {}
