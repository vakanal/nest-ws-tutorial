import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/alerts' })
export class AlertGateway {
  @WebSocketServer()
  private server: Server;

  sendToAll(msg: string) {
    this.server.emit('alertToClient', { type: 'alert', message: msg });
  }
}
