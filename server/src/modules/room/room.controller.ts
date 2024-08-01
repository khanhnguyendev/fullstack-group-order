import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseUtil, SuccessResponse } from '@common/utils/response.util';
import { RoomService } from './room.service';
import { Room } from './room.schema';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAllRooms(): Promise<SuccessResponse<Room[]>> {
    const rooms = await this.roomService.getAllRooms();
    return ResponseUtil.success(rooms);
  }

  @Get(':id')
  async getRoomById(@Param('id') id: string): Promise<SuccessResponse<Room>> {
    const room = await this.roomService.getRoomById(id);
    return ResponseUtil.success(room);
  }

  @Post()
  async create(@Body() data: Room): Promise<SuccessResponse<Room>> {
    const newRoom = await this.roomService.create(data);
    return ResponseUtil.success(newRoom);
  }
}
