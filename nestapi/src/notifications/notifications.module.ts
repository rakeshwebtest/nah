import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { CommonserviceModule } from 'src/shared/commonservice/commonservice.module';

@Module({
  imports: [CommonserviceModule],
  controllers: [NotificationsController]
})
export class NotificationsModule {

}
