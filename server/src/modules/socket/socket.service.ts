import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private wss: Server;

  setServer(wss: Server) {
    this.wss = wss;
  }

  notifyToAll<T>(event: string, message: T): void {
    this.wss.emit(event, message);
  }

  notifyToRoom<T>(event: string, room_id: string, message: T): void {
    this.wss.to(room_id).emit(event, message);
  }
}
