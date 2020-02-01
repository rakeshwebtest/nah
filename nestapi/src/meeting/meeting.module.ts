import { Module } from '@nestjs/common';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingEntity } from './meeting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { GroupEntity } from 'src/group/group.entity';
import { MeetingMembersEntity } from './meeting-members.entity';
import { MeetingCommentsEntity } from './meeting-comments.entity';
import { MeetingPhotosEntity } from './meeting-photos.entity';
import { MeetingVideosEntity } from './meeting-videos.entity';
import { MeetingReportEntity } from './meeting-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingEntity, MeetingMembersEntity,MeetingReportEntity, UserEntity, GroupEntity, MeetingCommentsEntity, MeetingPhotosEntity, MeetingVideosEntity])],
  controllers: [MeetingController],
  providers: [MeetingService]
})
export class MeetingModule { }
