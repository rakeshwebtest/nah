import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupFollowEntity } from 'src/group/group-follows.entity';
import { GroupEntity } from 'src/group/group.entity';
import { GroupService } from 'src/group/group.service';
import { MeetingCommentReplyEntity } from 'src/meeting/meeting-comment-reply.entity';
import { MeetingCommentsEntity } from 'src/meeting/meeting-comments.entity';
import { MeetingMembersEntity } from 'src/meeting/meeting-members.entity';
import { MeetingPhotosEntity } from 'src/meeting/meeting-photos.entity';
import { MeetingReportCateogryEntity } from 'src/meeting/meeting-report-category.entity';
import { MeetingReportEntity } from 'src/meeting/meeting-report.entity';
import { MeetingVideosEntity } from 'src/meeting/meeting-videos.entity';
import { MeetingEntity } from 'src/meeting/meeting.entity';
import { MeetingService } from 'src/meeting/meeting.service';
import { NotificationEntity } from 'src/notifications/notification.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { AgendaTopicsEntity } from 'src/posts/agenda-topics.entity';
import { AgendaEntity } from 'src/posts/agenda.entity';
import { PostBookmarksEntity } from 'src/posts/post-bookmarks.entity';
import { PostCommentReplyEntity } from 'src/posts/post-comment-reply.entity';
import { PostCommentsEntity } from 'src/posts/post-comments.entity';
import { PostDislikeEntity } from 'src/posts/post-dislike.entity';
import { PostLikeEntity } from 'src/posts/post-like.entity';
import { PostPhotosEntity } from 'src/posts/post-photos.entity';
import { PostReportEntity } from 'src/posts/post-report.entity';
import { PostVideosEntity } from 'src/posts/post-videos.entity';
import { PostEntity } from 'src/posts/post.entity';
import { PostService } from 'src/posts/posts/post.service';
import { ReportCateogryEntity } from 'src/report-category/report-category.entity';
import { ReportCategoryService } from 'src/report-category/report-category.service';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, GroupEntity,
        GroupFollowEntity, MeetingEntity, AgendaEntity, NotificationEntity,
        AgendaEntity, UserEntity, PostEntity, PostPhotosEntity, PostVideosEntity, PostCommentsEntity,
        PostCommentReplyEntity, AgendaTopicsEntity, PostBookmarksEntity, PostLikeEntity, PostDislikeEntity,
        MeetingMembersEntity, MeetingReportEntity, MeetingReportCateogryEntity, MeetingCommentsEntity, MeetingCommentReplyEntity, MeetingPhotosEntity, MeetingVideosEntity
        , ReportCateogryEntity, PostReportEntity])],
    providers: [UserService, GroupService, PostService, NotificationsService, MeetingService, ReportCategoryService],
    exports: [UserService, GroupService, PostService, NotificationsService, MeetingService, ReportCategoryService, TypeOrmModule]
})
export class CommonserviceModule { }