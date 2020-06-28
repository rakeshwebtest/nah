import { Module } from '@nestjs/common';
import { PostsController } from './posts/post.controller';
import { AgendaController } from './agenda/agenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaEntity } from './agenda.entity';
import { UserEntity } from './../user/user.entity';
import { AgendaService } from './agenda/agenda.service';
import { PostService } from './posts/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([AgendaEntity, UserEntity])],
  controllers: [PostsController, AgendaController],
  providers:[AgendaService, PostService]
})
export class PostsModule { }
