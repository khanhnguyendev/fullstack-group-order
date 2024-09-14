import * as dotenv from 'dotenv';
import config from './config/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoomModule } from '@modules/room/room.module';
import { ShopeefoodModule } from '@modules/shopeefood/shopeefood.module';
import { RestaurantModule } from '@modules/restaurant/restaurant.module';
import { DishModule } from '@modules/dish/dish.module';
import { OrderModule } from '@modules/order/order.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { SocketModule } from '@modules/socket/socket.module';
import { LoggingMiddleware } from '@common/logging/logging.middleware';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
        signOptions: { expiresIn: config.get('jwt.expiresIn') },
      }),
      global: true,
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        uri: config.get('mongodb.url'),
      }),
      inject: [ConfigService],
    }),

    RoomModule,
    ShopeefoodModule,
    RestaurantModule,
    DishModule,
    OrderModule,
    SocketModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
