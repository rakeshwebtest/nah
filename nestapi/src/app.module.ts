import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import * as path from 'path';
const ormConfig = require('./../ormconfig.json')

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...ormConfig, entities: [path.join(__dirname, '**/*.entity{.ts,.js}')] }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
