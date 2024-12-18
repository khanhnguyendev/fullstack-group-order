import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseUtil } from '@common/utils/response.util';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { UserPayload } from '@common/interfaces/user-payload.interface';
import { API_ROUTES } from '@common/constants/api-route';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller({ path: 'room', version: '1' })
@ApiBearerAuth('access-token')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(API_ROUTES.ROOM.ALL)
  async getAllRooms() {
    const rooms = await this.roomService.getAllRooms();
    return ResponseUtil.success(rooms);
  }

  @Get(API_ROUTES.ROOM.GET_BY_ID)
  async getRoomById(@Param('id') id: string) {
    const room = await this.roomService.getRoomById(id);
    return ResponseUtil.success(room);
  }

  @Post(API_ROUTES.ROOM.CREATE)
  async create(@CurrentUser() token: UserPayload, @Body() data: CreateRoomDto) {
    const newRoom = await this.roomService.create(token, data);
    return ResponseUtil.success(newRoom);
  }
}
