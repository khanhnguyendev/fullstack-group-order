import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseUtil } from '@common/utils/response.util';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { UserPayload } from '@common/interfaces/user-payload.interface';

@Controller({ path: 'room', version: '1' })
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async getAllRooms() {
    const rooms = await this.roomService.getAllRooms();
    return ResponseUtil.success(rooms);
  }

  @Get(':id')
  async getRoomById(@Param('id') id: string) {
    const room = await this.roomService.getRoomById(id);
    return ResponseUtil.success(room);
  }

  @Post()
  async create(@CurrentUser() user: UserPayload, @Body() data: CreateRoomDto) {
    const newRoom = await this.roomService.create(user, data);
    return ResponseUtil.success(newRoom);
  }
}
