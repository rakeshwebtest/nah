import { Injectable } from '@nestjs/common';
import { FcmSendDto } from './notification.dto';
import { FcmService } from 'nestjs-fcm';
import { UserService } from 'src/user/user.service';
import { NotificationEntity } from './notification.entity';
import { Repository, getRepository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupFollowEntity } from 'src/group/group-follows.entity';
// import * as admin from 'firebase-admin';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly fcm: FcmService,
        @InjectRepository(NotificationEntity) private readonly notificationRepository: Repository<NotificationEntity>,
        @InjectRepository(GroupFollowEntity) private readonly groupFollowRepository: Repository<GroupFollowEntity>,
        private readonly userService: UserService) {
    }
    async send(senderId?: any, reciverId?: any, type?: string, data?: any, body?: FcmSendDto) {

        const users = await this.userService.getUserBasicInfo([senderId, reciverId]);

        let senderInfo: any;
        let reciverInfo: any;
        if (users && users[0]) {
            if (users[0].id === senderId) {
                if (users[0])
                    senderInfo = users[0];
                if (users[1])
                    reciverInfo = users[1];
            } else {
                if (users[1])
                    senderInfo = users[1];
                if (users[0])
                    reciverInfo = users[0];
            }
            const _entity: any = new NotificationEntity();
            switch (type) {
                case 'post-like':
                    _entity.sender = { id: senderInfo.id };
                    _entity.recipient = { id: reciverInfo.id };
                    _entity.type = type;
                    _entity.message = senderInfo.displayName + ' liked your post';
                    _entity.data = data;
                    if (reciverInfo.fcmToken) {
                        // send push notifications
                        this.sendFCM(reciverInfo.fcmToken, 'Post', _entity.message, { data, type: 'post-like' });
                    }
                    const d = await this.notificationRepository.save(_entity);
                    break;
                case 'post-create':
                    // create a new post send to following members
                    const query: any = { type: 'following', userId: senderId };
                    const followingMembers: any = await this.userService.getUsers(query);
                    const bulkNotifications = [];
                    for (const followingMember of followingMembers) {
                        const notificationMsg = {
                            sender: { id: senderInfo.id },
                            recipient: { id: followingMember.id },
                            type,
                            message: senderInfo.displayName + ' created a new post',
                            data
                        };
                        bulkNotifications.push(notificationMsg);
                        if (followingMember.fcmToken)
                            this.sendFCM(followingMember.fcmToken, 'Post', notificationMsg.message, { data, type: 'post-create' });

                    }
                    await getConnection()
                        .createQueryBuilder()
                        .insert()
                        .into(NotificationEntity)
                        .values(bulkNotifications)
                        .execute();

                    break;
                case 'group-create':
                    // create a new post send to following members
                    const query2: any = { type: 'following', userId: senderId };
                    const followingMembers2: any = await this.userService.getUsers(query2);
                    const bulkNotifications2 = [];
                    for (const followingMember of followingMembers2) {
                        data.navigateUrl = '/group/details/' + data.id;
                        const notificationMsg = {
                            sender: { id: senderInfo.id },
                            recipient: { id: followingMember.id },
                            type,
                            message: senderInfo.displayName + ' created a new group',
                            data
                        };
                        bulkNotifications2.push(notificationMsg);
                        if (followingMember.fcmToken)
                            this.sendFCM(followingMember.fcmToken, 'Group', notificationMsg.message, { data, type: 'group-create' });

                    }
                    await getConnection()
                        .createQueryBuilder()
                        .insert()
                        .into(NotificationEntity)
                        .values(bulkNotifications2)
                        .execute();

                    break;
                case 'meeting-create':
                    // create a new post send to following members
                    const query3: any = { type: 'following', userId: senderId };
                    const followingMembers3: any = await this.userService.getUsers(query3);
                    const groupFollowing: any = await this.getMembersByGroupId(data.group.id);
                    const bulkNotifications3 = [];
                    const allUser = [...followingMembers3, ...groupFollowing];
                    for (const followingMember of allUser) {
                        data.navigateUrl = '/meeting/details/' + data.id;
                        const notificationMsg = {
                            sender: { id: senderInfo.id },
                            recipient: { id: followingMember.id },
                            type,
                            message: senderInfo.displayName + ' created a meeting',
                            data
                        };
                        bulkNotifications3.push(notificationMsg);
                        if (followingMember.fcmToken)
                            this.sendFCM(followingMember.fcmToken, 'Meeting', notificationMsg.message, { data, type: 'meeting-create' });

                    }
                    await getConnection()
                        .createQueryBuilder()
                        .insert()
                        .into(NotificationEntity)
                        .values(bulkNotifications3)
                        .execute();

                    break;
                case 'meeting-update':
                    // create a new post send to following members
                    const query4: any = { type: 'following', userId: senderId };
                    const followingMembers4: any = await this.userService.getUsers(query4);
                    const groupFollowing1: any = await this.getMembersByGroupId(data.group.id);
                    const bulkNotifications4 = [];
                    // const allUser = [...followingMembers3, ...groupFollowing];
                    for (const followingMember of groupFollowing1) {
                        data.navigateUrl = '/meeting/details/' + data.id;
                        const notificationMsg = {
                            sender: { id: senderInfo.id },
                            recipient: { id: followingMember.id },
                            type,
                            message: senderInfo.displayName + ' meeting update',
                            data
                        };
                        bulkNotifications3.push(notificationMsg);
                        if (followingMember.fcmToken)
                            this.sendFCM(followingMember.fcmToken, 'Meeting', notificationMsg.message, { data, type: 'meeting-create' });

                    }
                    await getConnection()
                        .createQueryBuilder()
                        .insert()
                        .into(NotificationEntity)
                        .values(bulkNotifications4)
                        .execute();

                    break;
                case 'post-comment':
                case 'post-reply-comment':
                    _entity.sender = { id: senderInfo.id };
                    _entity.recipient = { id: reciverInfo.id };
                    _entity.type = type;
                    _entity.message = senderInfo.displayName + ' commented on your post';
                    _entity.data = data;
                    if (reciverInfo.fcmToken) {
                        // send push notifications
                        this.sendFCM(reciverInfo.fcmToken, 'Post', _entity.message, { data, type: 'post-comment' });
                    }
                    const a = await this.notificationRepository.save(_entity);
                    break;
                case 'group-follow':
                    _entity.sender = { id: senderInfo.id };
                    _entity.recipient = { id: reciverInfo.id };
                    _entity.type = type;
                    _entity.message = senderInfo.displayName + '  followed on your group';
                    data.navigateUrl = '/group/details/' + data.id;
                    _entity.data = data;

                    if (reciverInfo.fcmToken) {
                        // send push notifications
                        this.sendFCM(reciverInfo.fcmToken, 'Group', _entity.message, { data, type: 'group-follow' });
                    }
                    await this.notificationRepository.save(_entity);
                    break;
                case 'meeting-join':
                    _entity.sender = { id: senderInfo.id };
                    _entity.recipient = { id: reciverInfo.id };
                    _entity.type = type;
                    _entity.message = senderInfo.displayName + '  joined on your meeting';
                    data.navigateUrl = '/meeting/details/' + data.id;
                    _entity.data = data;
                    if (reciverInfo.fcmToken) {
                        // send push notifications
                        this.sendFCM(reciverInfo.fcmToken, 'Meeting', _entity.message, { data, type: 'meeting-join' });
                    }
                    await this.notificationRepository.save(_entity);
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
            .createQueryBuilder("n")
            .leftJoinAndSelect('n.recipient', 'recipient')
            .leftJoinAndSelect('n.sender', 'sender')
            .andWhere('n.recipient.id=:id', { id: userId })
            .orderBy({ "n.createdDate": "DESC" });

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

    async getMembersByGroupId(groupId) {
        return getRepository(GroupFollowEntity)
            .createQueryBuilder('gf')
            .leftJoinAndSelect("gf.user", 'user')
            .where('gf.groupId = :groupId', { groupId })
            .getMany();
    }
}