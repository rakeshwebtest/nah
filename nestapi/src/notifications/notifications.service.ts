import { Injectable } from '@nestjs/common';
import { FcmSendDto } from './notification.dto';
import { FcmService } from 'nestjs-fcm';
import { UserService } from 'src/user/user.service';
import { NotificationEntity } from './notification.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import * as admin from 'firebase-admin';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly fcm: FcmService,
        @InjectRepository(NotificationEntity) private readonly notificationRepository: Repository<NotificationEntity>,
        private readonly userService: UserService) {
    }
    async send(senderId?: any, reciverId?: any, type?: string, data?: any, body?: FcmSendDto) {

        const users = await this.userService.getUserBasicInfo([senderId, reciverId]);

        let senderInfo: any;
        let reciverInfo: any;

        if (users && users[0] && users[1]) {
            if (users[0].id === senderId) {
                senderInfo = users[0];
                reciverInfo = users[1];
            } else {
                senderInfo = users[1];
                reciverInfo = users[0];
            }
        }
        switch (type) {
            case 'post-like':
                const _entity = new NotificationEntity();
                _entity.sender.id = senderInfo.id;
                _entity.recipient.id = reciverInfo.id;
                _entity.message = senderInfo.displayName + ' Like the your post';
                _entity.data = data;
                if (reciverInfo.fcmToken) {
                    // send push notifications
                    this.sendFCM(reciverInfo.fcmToken, 'Post', _entity.message, { data, type: 'post-like' });
                }
                const d = await this.notificationRepository.save(_entity);
                console.log('d', d);
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

        //  const data = await admin.messaging().sendToTopic('post-details', payload);
        // const data = await this.notificationS.send(notification);
        // return result;
    }

    async sendFCM(fcmToken, title: string, msg: string, data) {

        const payload = {
            data,
            notification: {
                title: title || 'NAH',
                body: msg,
                icon: 'ic_notification',
                color: '#18d821',
                sound: 'default'
            },

        };
        const result = await this.fcm.sendNotification([fcmToken], payload, false);
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