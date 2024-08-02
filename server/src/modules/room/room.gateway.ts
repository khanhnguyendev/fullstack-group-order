import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from '../socket/socket.service';

@WebSocketGateway({ cors: true })
export class RoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('RoomGateway');

  @WebSocketServer() wss: Server;

  constructor(private readonly socketService: SocketService) {}

  // keep track of connected client IDs
  private connectedClients: Set<string> = new Set();

  afterInit(server: Server) {
    this.logger.log('RoomGateway initialized');
    this.socketService.setServer(this.wss);
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

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    this.logger.log(`Client ${client.id} joined room ${room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    this.logger.log(`Client ${client.id} left room ${room}`);
  }

  notifyToAll<T>(event: string, message: T): void {
    this.socketService.notifyToAll(event, message);
  }
}
