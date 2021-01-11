import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { GroupEntity } from 'src/group/group.entity';
import { GroupFollowEntity } from 'src/group/group-follows.entity';
import { MeetingEntity } from 'src/meeting/meeting.entity';
import { AgendaEntity } from 'src/posts/agenda.entity';
import { NotificationEntity } from 'src/notifications/notification.entity';
import { AppMailerService } from 'src/app-mailer/app-mailer.service';
import { CommonserviceModule } from 'src/shared/commonservice/commonservice.module';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, GroupEntity, GroupFollowEntity, MeetingEntity, AgendaEntity, NotificationEntity]), CommonserviceModule],
  providers: [AppMailerService],
  controllers: [UsersController]
})
export class UserModule {

}
