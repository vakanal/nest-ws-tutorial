import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AlertController } from './alert/alert.controller';
import { AlertGateway } from './alert/alert.gateway';
import { ChatGateway } from './chat/chat.gateway';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      // exclude: ['/api*'],
    }),
  ],
  controllers: [AlertController],
  providers: [AlertGateway, ChatGateway],
})
export class AppModule {}
