import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './group.entity';
import { GroupFollowEntity } from './group-follows.entity';
import { UserEntity } from '../user/user.entity';
import { MeetingEntity } from '../meeting/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, GroupFollowEntity, UserEntity,MeetingEntity])],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule { }
