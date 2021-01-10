import { Module } from '@nestjs/common';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { CommonserviceModule } from 'src/shared/commonservice/commonservice.module';

@Module({
  imports: [CommonserviceModule],
  controllers: [MeetingController]
})
export class MeetingModule { }
