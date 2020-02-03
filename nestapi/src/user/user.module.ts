import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { GroupService } from 'src/group/group.service';
import { GroupEntity } from 'src/group/group.entity';
import { GroupFollowEntity } from 'src/group/group-follows.entity';
import { MeetingEntity } from 'src/meeting/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, GroupEntity, GroupFollowEntity, MeetingEntity])],
  providers: [UserService, GroupService],
  controllers: [UsersController]
})
export class UserModule {

}
