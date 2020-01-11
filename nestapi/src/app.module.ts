import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...DB, entities: [path.join(__dirname, '**/*.entity{.ts,.js}')] }),
    UserModule,
    GroupModule,
    MeetingModule,
    MulterModule.register({
      dest: './uploads'
    }),
    CityModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
