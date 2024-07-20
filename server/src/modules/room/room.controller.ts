import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.schema';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAllRooms(): Promise<Room[]> {
    return this.roomService.getAllRooms();
  }

  @Get(':id')
  async getRoomById(@Param('id') id: string): Promise<Room> {
    return this.roomService.getRoomById(id);
  }

  @Post()
  async create(@Body() data: Room): Promise<Room> {
    return this.roomService.create(data);
  }
}
