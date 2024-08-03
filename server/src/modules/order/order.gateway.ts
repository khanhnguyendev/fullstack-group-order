import { SocketService } from '@modules/socket/socket.service';
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class OrderGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly socketService: SocketService) {}

  handleConnection(client: Socket, ...args: any[]) {}

  handleDisconnect(client: Socket) {}

  notifyToRoom<T>(event: string, room_id: string, message: T): void {
    this.socketService.notifyToRoom(event, room_id, message);
  }

  notify<T>(event: string, message: T): void {
    this.socketService.notifyToAll(event, message);
  }
}
