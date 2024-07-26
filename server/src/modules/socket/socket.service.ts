import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
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
    } else {
      this.wss.to(message.roomId).emit(event, message.data);
    }
  }
}
