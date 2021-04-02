import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, {
  path: '/websockets',
  serveClient: true,
  transports: ['polling', 'websocket'],
  namespace: '/',
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer()
  private server: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  //* Example with secure data type response (WsResponse<string>)
  @SubscribeMessage('msgToSrv')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return { event: 'msgToClt', data: text };
  }

  //* Example to response only at the client
  /*
  @SubscribeMessage('msgToSrv')
  handleMessage(client: Socket, text: string): void {
    client.emit('msgToClt', text);
  }
  */

  //* Example to respose to all
  /*
  @SubscribeMessage('msgToSrv')
  handleMessage(client: Socket, text: string): void {
    this.server.emit('msgToClt', text);
  }
  */
}
