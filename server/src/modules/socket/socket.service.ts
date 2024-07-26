import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly logger = new Logger(SocketService.name);
  private wss: Server;

  setServer(wss: Server) {
    this.wss = wss;
  }

  notify<T>(
    event: string,
    type: string,
    message: { sender: string; roomId?: string; data: T },
  ): void {
    if (type === 'toAll') {
      this.wss.emit(event, message.data);
      return;
    }
    if (!message.roomId) {
      return this.logger.error(
        `Cannot send socket message to room ${message.roomId}`,
      );
    }
    this.wss.to(message.roomId).emit(event, message.data);
  }
}
