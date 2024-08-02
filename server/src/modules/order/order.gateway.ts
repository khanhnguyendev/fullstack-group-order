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
  private logger: Logger = new Logger('RoomGateway');

  @WebSocketServer() wss: Server;

  constructor(private readonly socketService: SocketService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected:${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected:${client.id}`);
  }

  notify<T>(event: string, type: string, message: T): void {
    this.socketService.notify(event, type, message);
  }
}
