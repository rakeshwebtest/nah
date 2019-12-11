import { Module } from '@nestjs/common';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingEntity } from './meeting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MeetingEntity])],
  controllers: [MeetingController],
  providers: [MeetingService]
})
export class MeetingModule {}
