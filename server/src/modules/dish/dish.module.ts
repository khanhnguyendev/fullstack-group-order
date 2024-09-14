import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { Dish, DishSchema } from '@schemas/dish.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: DishSchema, name: Dish.name }]),
  ],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}
