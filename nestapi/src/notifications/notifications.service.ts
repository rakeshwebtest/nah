import { Injectable } from '@nestjs/common';
import { FcmSendDto } from './notification.dto';
import { FcmService } from 'nestjs-fcm';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/posts/posts/post.service';
// import * as admin from 'firebase-admin';

@Injectable()
export class NotificationsService {
    constructor(private readonly fcm: FcmService,
        private readonly userService: UserService) {
    }
    async send(senderId?: any, reciverId?: any, type?: string, data?: any, body?: FcmSendDto) {

        const users = await this.userService.getUserBasicInfo([senderId, reciverId]);

        switch (type) {
            case 'post-like':
                
                break;

            default:
                break;
        }

        const payload = {
            data: {
                cpeMac: '000000000000',
                type: 'malware'
            },
            notification: {
                title: body.title || 'NAH',
                body: body.body,
                icon: 'ic_notification',
                color: '#18d821',
                sound: 'default'
            },

        };
        const result = await this.fcm.sendNotification([body.fcmToken], payload, false);
        //  const data = await admin.messaging().sendToTopic('post-details', payload);
        // const data = await this.notificationS.send(notification);
        return result;
    }
    send2(notification: FcmSendDto) {

        // console.log("START");
        // const FCM = require('fcm-node');
        // const serverKey = require('../../fairbase.json');
        // const fcm = new FCM(serverKey);
        // const collapseKey = 'new_message';
        // const message = {
        //     to: notification.fcmToken,
        //     data: {
        //         cpeMac: '000000000000',
        //         type: 'malware'
        //     },
        //     notification: {
        //         title: 'Hello motherfucker',
        //         body: 'Nice body',
        //         tag: collapseKey,
        //         icon: 'ic_notification',
        //         color: '#18d821',
        //         sound: 'default',
        //     },
        // };


        // fcm.send(message, function (err, response) {
        //     if (err) {
        //         console.log("Something has gone wrong!");

        //         console.log(err);

        //     } else {
        //         console.log("Successfully sent with response: ", response);
        //     }
        // });

    }
}