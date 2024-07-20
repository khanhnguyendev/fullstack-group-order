import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.schema';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomService.getAll();
  }

  @Get(':id')
  async getRoom(@Param('id') id: string): Promise<Room> {
    return this.roomService.getOne(id);
  }

  @Post()
  async create(@Body() orderData: Room): Promise<Room> {
    return this.roomService.create(orderData);
  }
}
