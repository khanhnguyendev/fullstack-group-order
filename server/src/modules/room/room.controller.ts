import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.schema';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomService.getAll();
  }

  @Post()
  async create(@Body() orderData: Room): Promise<Room> {
    return this.roomService.create(orderData);
  }
}
