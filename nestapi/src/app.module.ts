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
import { APP_CONFIG } from './config';
import { AuthMiddleware } from './user/auth.middleware';
import { UserService } from './user/user.service';
import { UserEntity } from './user/user.entity';
import { PostsModule } from './posts/posts.module';
import { AssetsModule } from './assets/assets.module';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FcmModule } from 'nestjs-fcm';
import { RedisModule } from 'nestjs-redis';
import { QueueMngModule } from './queue-mng/queue-mng.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...APP_CONFIG.DB, entities: [path.join(__dirname, '**/*.entity{.ts,.js}')] }),
    TypeOrmModule.forFeature([UserEntity]),
    RedisModule.register(APP_CONFIG.REDIS),
    FcmModule.forRoot({
      firebaseSpecsPath: path.join(__dirname, '../fairbase.json')
    }),
    UserModule,
    GroupModule,
    MeetingModule,
    MulterModule.register({
      dest: './uploads'
    }),
    CityModule,
    PostsModule,
    AssetsModule,
    ChatModule,
    NotificationsModule
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
        { path: 'user/changePassword', method: RequestMethod.ALL },
        { path: 'user/unblock/*', method: RequestMethod.ALL },
        { path: 'user', method: RequestMethod.PUT },
        { path: 'user/follow', method: RequestMethod.POST },
        { path: 'user/unfollow', method: RequestMethod.POST },
        { path: 'user/profileBlock', method: RequestMethod.POST },
        { path: 'user/profileUnblock', method: RequestMethod.POST },
        { path: 'user/:id', method: RequestMethod.GET },
        { path: 'group', method: RequestMethod.ALL },
        { path: 'group/*', method: RequestMethod.ALL },
        { path: 'meeting/*', method: RequestMethod.ALL },
        { path: 'agenda', method: RequestMethod.ALL },
        { path: 'posts', method: RequestMethod.ALL },
        { path: 'posts/*', method: RequestMethod.ALL },
        { path: 'notifications', method: RequestMethod.GET }
      );
  }
}
