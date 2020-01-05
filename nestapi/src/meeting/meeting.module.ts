import { Module } from '@nestjs/common';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingEntity } from './meeting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { GroupEntity } from 'src/group/group.entity';
import { MeetingMembersEntity } from './meeting-members.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingEntity, MeetingMembersEntity, UserEntity, GroupEntity])],
  controllers: [MeetingController],
  providers: [MeetingService]
})
export class MeetingModule { }
