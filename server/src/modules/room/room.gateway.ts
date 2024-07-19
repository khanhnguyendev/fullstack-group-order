import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class RoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('RoomGateway');

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Initilized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected:${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected:${client.id}`);
  }

  notify<T>(event: string, data: T): void {
    this.wss.emit(event, data);
  }
}
