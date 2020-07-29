import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FcmSendDto } from './notification.dto';
import { NotificationsService } from './notifications.service';
import { FcmService } from 'nestjs-fcm';

@ApiTags('FCM Notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly fcmS: NotificationsService) {

    }
    @Post()
    async sendFCMNotification(@Body() notification: FcmSendDto) {
        const data = await this.fcmS.send(1, 2, notification);
        // const data = await this.notificationS.send(notification);
        return { message: 'send successfully', success: true, data };
    }
}
