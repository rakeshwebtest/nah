import { Injectable } from '@nestjs/common';
import { FcmSendDto } from './notification.dto';
import { FcmService } from 'nestjs-fcm';
import { UserService } from 'src/user/user.service';
import { NotificationEntity } from './notification.entity';
import { Repository, getRepository } from 'typeorm';
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
            switch (type) {
                case 'post-like':
                    const _entity: any = new NotificationEntity();
                    _entity.sender = { id: senderInfo.id };
                    _entity.recipient = { id: reciverInfo.id };
                    _entity.type = type;
                    _entity.message = senderInfo.displayName + ' Liked your post';
                    _entity.data = data;
                    if (reciverInfo.fcmToken) {
                        // send push notifications
                        this.sendFCM(reciverInfo.fcmToken, 'Post', _entity.message, { data, type: 'post-like' });
                    }
                    const d = await this.notificationRepository.save(_entity);
                    break;
                default:
                    break;
            }

        }

        //  const data = await admin.messaging().sendToTopic('post-details', payload);
        // const data = await this.notificationS.send(notification);
        // return result;
    }

    async sendFCM(fcmToken, title: string, msg: string, data: any = {}) {

        const payload: any = {
            data: {
                type: data.type || 'normal'
            },
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

    getNotifications(userId, query) {
        const take = query.take || 5000;
        const skip = query.skip || 0;

        const db = getRepository(NotificationEntity)
            .createQueryBuilder("u")
            .leftJoinAndSelect('u.recipient', 'recipient')
            .leftJoinAndSelect('u.sender', 'sender')
            .andWhere('u.recipient.id=:id', { id: userId });

        db.take(take);
        db.skip(skip);
        return db.getMany();
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