import { Controller, Body, Post, Get, Request, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FcmSendDto } from './notification.dto';
import { NotificationsService } from './notifications.service';
import { FcmService } from 'nestjs-fcm';

@ApiTags('FCM Notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly fcmS: NotificationsService) {

    }
    @ApiBearerAuth()
    @Get()
    async getNotification(@Request() req, @Query() query: any) {
        const userInfo = req['sessionUser'];
        console.log('userInfo', userInfo);
        const data = await this.fcmS.getNotifications(userInfo.id, query);
        return { message: false, success: true, data };
    }
    @Post()
    async sendFCMNotification(@Body() notification: FcmSendDto) {
        const data = ''; // await this.fcmS.send(1, 2, notification);
        // const data = await this.notificationS.send(notification);
        return { message: 'send successfully', success: true, data };
    }
}
