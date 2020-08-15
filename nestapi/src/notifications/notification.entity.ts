import { Entity, ManyToOne, Column, ManyToMany, Unique } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { BaseEntity } from "src/shared/base.entity";

@Entity({ name: 'user_notification' })
export class NotificationEntity extends BaseEntity {

    @ManyToOne(type => UserEntity, user => user.recipientNotifications)
    recipient: UserEntity;

    @ManyToOne(type => UserEntity, user => user.senderNotifications)
    sender: UserEntity;

    @Column({ type: 'text', nullable: true })
    message: string;

    @Column({ type: 'text' })
    type: string;

    @Column("simple-json")
    data: any;

    @Column({ default: 0 })
    isRead: Number;

}