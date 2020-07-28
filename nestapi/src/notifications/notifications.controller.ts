import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FcmSendDto } from './notification.dto';
import { NotificationsService } from './notifications.service';
import { FcmService } from 'nestjs-fcm';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private notificationS: NotificationsService, private readonly fcmService: FcmService) {

    }
    @Post()
    async createCity(@Body() notification: FcmSendDto) {
        const payload = {
            data: {
                cpeMac: '000000000000',
                type: 'malware'
            },
            notification: {
                title: 'Hello motherfucker',
                body: 'Nice body',
                icon: 'ic_notification',
                color: '#18d821',
                sound: 'default',
            }
        };
        const data = await this.fcmService.sendNotification([notification.fcmToken], payload, false);
        // const data = await this.notificationS.send(notification);
        return { message: 'send successfully', success: true, data };
    }
}
