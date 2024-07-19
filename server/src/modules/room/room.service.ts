import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './schema/room.schema';
import { RoomGateway } from './room.gateway';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    private roomGateway: RoomGateway,
  ) {}

  async getAll(): Promise<Room[]> {
    return this.roomModel.find({});
  }

  async create(orderData: Room): Promise<Room> {
    try {
      const newRoom = await this.roomModel.create(orderData);
      await newRoom.save();
      this.roomGateway.notify('room-created', newRoom);

      return newRoom;
    } catch (error) {
      throw error;
    }
  }
}
