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

  // keep track of connected client IDs
  private connectedClients: Set<string> = new Set();

  afterInit(server: Server) {
    this.logger.log('Initilized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.connectedClients.add(client.id);
    this.logger.log(`Client connected: ${client.id}`);
    this.logger.log(`Total connected clients: ${this.connectedClients.size}`);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
    this.logger.log(`Total connected clients: ${this.connectedClients.size}`);
  }

  notify<T>(event: string, data: T): void {
    this.wss.emit(event, data);
  }
}
