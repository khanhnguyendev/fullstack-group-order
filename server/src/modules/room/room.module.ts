import { Module } from '@nestjs/common';
import { Room, RoomSchema } from './schema/room.schema';
import { RoomService } from './room.service';
import { RoomGateway } from './room.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomController } from './room.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: RoomSchema, name: Room.name }]),
  ],
  controllers: [RoomController],
  providers: [RoomService, RoomGateway],
})
export class RoomModule {}
