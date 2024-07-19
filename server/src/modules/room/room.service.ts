import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room.schema';
import { RoomGateway } from './room.gateway';
import { ShopeeFoodService } from 'src/shopeefood/shopeefood.service';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    private readonly roomGateway: RoomGateway,
    private readonly shopeefoodService: ShopeeFoodService,
  ) {}

  async getAll(): Promise<Room[]> {
    try {
      return await this.roomModel.find().exec();
    } catch (error) {
      this.logger.error('Error fetching all rooms', error.stack);
      throw error;
    }
  }

  async create(roomData: Room): Promise<Room> {
    try {
      // get restaurant info from shopeefood
      const restaurantInfo = await this.getRestaurantInfo(roomData.url);

      const newRoomData = {
        ...roomData,
        restaurant_id: restaurantInfo.restaurant_id,
        delivery_id: restaurantInfo.delivery_id,
      };

      // create new room
      this.logger.log('Creating room with data:', newRoomData);
      const newRoom = new this.roomModel(newRoomData);
      await newRoom.save();
      this.logger.log('Room created:', newRoom);

      // notify all clients about the new room
      this.roomGateway.notify('room-created', newRoom);

      return newRoom;
    } catch (error) {
      this.logger.error('Error while creating room', error.stack);
      throw error;
    }
  }

  private async getRestaurantInfo(url: string): Promise<any> {
    const restaurantInfo = await this.shopeefoodService.getFromUrl(url);

    if (
      !restaurantInfo ||
      !restaurantInfo.restaurant_id ||
      !restaurantInfo.delivery_id
    ) {
      this.logger.error(
        `[ShopeeFoodAPI] Restaurant not found with url: ${url}`,
      );
    }

    return restaurantInfo;
  }
}
