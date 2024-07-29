import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly logger = new Logger(SocketService.name);
  private wss: Server;

  setServer(wss: Server) {
    this.wss = wss;
  }

  notify<T>(event: string, type: string, message: T): void {
    if (type === 'toAll') {
      this.wss.emit(event, message);
      return;
    }

    const roomId = (message as any).roomId; // Adjusted to expect roomId in the message if needed
    if (!roomId) {
      return this.logger.error(`Cannot send socket message to room ${roomId}`);
    }
    this.wss.to(roomId).emit(event, message);
  }
}
