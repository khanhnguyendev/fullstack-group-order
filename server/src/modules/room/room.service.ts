import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room.schema';
import { RoomGateway } from './room.gateway';
import { ShopeeFoodService } from 'src/shopeefood/shopeefood.service';
import { Restaurant } from 'src/modules/restaurant/restaurant.schema';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(
    @InjectModel(Room.name)
    private readonly roomModel: Model<Room>,
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
    private readonly roomGateway: RoomGateway,
    private readonly shopeefoodService: ShopeeFoodService,
  ) {}

  async getAllRooms(): Promise<Room[]> {
    try {
      return await this.roomModel.find().exec();
    } catch (error) {
      this.logger.error('Failed to fetch rooms', error.stack);
      throw error;
    }
  }

  async getRoomById(id: string): Promise<Room> {
    try {
      const room = await this.roomModel.findById(id).exec();
      if (!room) {
        throw new Error('Room not found');
      }
      return room;
    } catch (error) {
      this.logger.error('Failed to fetch room', error.stack);
      throw error;
    }
  }

  async create(roomData: Room): Promise<Room> {
    try {
      // Step 1: Fetch restaurant info from ShopeeFood
      const restaurantInfo = await this.fetchRestaurantInfo(roomData.url);
      if (!restaurantInfo) {
        throw new Error('Restaurant information could not be retrieved');
      }

      // Step 2: Create and save the room
      this.logger.log('Creating new room...');
      const room = new this.roomModel({
        ...roomData,
        restaurant_id: restaurantInfo.restaurant_id,
        delivery_id: restaurantInfo.delivery_id,
      });
      const savedRoom = await room.save();
      this.logger.log('New room created:', savedRoom);

      // Step 3: Fetch restaurant details from ShopeeFood
      const restaurantDetails = await this.fetchRestaurantDetails(
        restaurantInfo.restaurant_id,
      );
      if (!restaurantDetails) {
        throw new Error('Restaurant details could not be retrieved');
      }

      // Step 4: Create and save the restaurant details
      this.logger.log('Creating new restaurant...');
      const restaurant = new this.restaurantModel({
        ...restaurantDetails,
        room_id: savedRoom._id,
      });
      await restaurant.save();
      this.logger.log('New restaurant created:', restaurant);

      // Notify all clients about the new room
      this.roomGateway.notify('room-created', savedRoom);

      return savedRoom;
    } catch (error) {
      this.logger.error('Error creating room', error.stack);
      throw error;
    }
  }

  private async fetchRestaurantInfo(url: string): Promise<any> {
    const info = await this.shopeefoodService.getFromUrl(url);
    if (!info || !info.restaurant_id || !info.delivery_id) {
      this.logger.error(`Restaurant info not found for URL: ${url}`);
    }
    return info;
  }

  private async fetchRestaurantDetails(restaurantId: string): Promise<any> {
    return this.shopeefoodService.getRestaurantDetail(restaurantId);
  }
}
