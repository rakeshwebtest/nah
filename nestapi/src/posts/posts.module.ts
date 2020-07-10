import { Module } from '@nestjs/common';
import { PostsController } from './posts/post.controller';
import { AgendaController } from './agenda/agenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaEntity } from './agenda.entity';
import { UserEntity } from './../user/user.entity';
import { PostEntity } from './post.entity';
import { PostPhotosEntity } from './post-photos.entity';
import { PostVideosEntity } from './post-videos.entity';
import { PostCommentsEntity } from './post-comments.entity';
import { PostCommentReplyEntity } from './post-comment-reply.entity';
import { AgendaTopicsEntity } from './agenda-topics.entity';
import { AgendaService } from './agenda/agenda.service';
import { PostService } from './posts/post.service';
import { PostBookmarksEntity } from './post-bookmarks.entity';
import { PostLikeEntity } from './post-like.entity';
import { PostDislikeEntity } from './post-dislike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgendaEntity, UserEntity, PostEntity, PostPhotosEntity, PostVideosEntity, PostCommentsEntity,
    PostCommentReplyEntity, AgendaTopicsEntity, PostBookmarksEntity, PostLikeEntity, PostDislikeEntity])],
  controllers: [PostsController, AgendaController],
  providers: [AgendaService, PostService]
})
export class PostsModule { }
