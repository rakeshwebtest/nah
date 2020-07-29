import { Injectable } from '@nestjs/common';
import { FcmSendDto } from './notification.dto';
import { FcmService } from 'nestjs-fcm';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationsService {
    constructor(private readonly fcm: FcmService) {
    }
    async send(senderId, reciverId, body: FcmSendDto) {

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
        const data = await this.fcm.sendNotification([body.fcmToken], payload, false);
      //  const data = await admin.messaging().sendToTopic('post-details', payload);
        // const data = await this.notificationS.send(notification);
        return data;
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