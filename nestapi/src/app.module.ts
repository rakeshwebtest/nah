import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { MeetingModule } from './meeting/meeting.module';
import * as path from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { CityModule } from './city/city.module';
import { DB } from './config';
import { AuthMiddleware } from './user/auth.middleware';
import { UserService } from './user/user.service';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...DB, entities: [path.join(__dirname, '**/*.entity{.ts,.js}')] }),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    GroupModule,
    MeetingModule,
    MulterModule.register({
      dest: './uploads'
    }),
    CityModule
  ],
  controllers: [AppController],
  providers: [AuthMiddleware, UserService],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user/list', method: RequestMethod.GET },
        { path: 'user/block/*', method: RequestMethod.ALL },
        { path: 'user/unblock/*', method: RequestMethod.ALL },
        { path: 'user', method: RequestMethod.PUT },
        { path: 'group', method: RequestMethod.ALL },
        { path: 'group/*', method: RequestMethod.ALL },
        { path: 'meeting/*', method: RequestMethod.ALL }
      );
  }
}
