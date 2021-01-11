import { Module } from '@nestjs/common';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
    imports: [NotificationsModule],
    exports: [NotificationsService]
})
export class SharedNotificationModule { }
