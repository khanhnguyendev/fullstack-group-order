import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './modules/room/room.module';
import { ShopeefoodModule } from './shopeefood/shopeefood.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { DishModule } from './modules/dish/dish.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    RoomModule,
    ShopeefoodModule,
    RestaurantModule,
    DishModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
