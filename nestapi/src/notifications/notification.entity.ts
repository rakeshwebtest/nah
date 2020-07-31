import { BaseEntity, Entity, ManyToOne, Column, ManyToMany } from "typeorm";
import { UserEntity } from "src/user/user.entity";

@Entity({ name: 'notification' })
export class NotificationEntity extends BaseEntity {

    @ManyToMany(type => UserEntity, user => user.id)
    recipient: UserEntity;

    @ManyToMany(type => UserEntity, user => user.id)
    sender: UserEntity;

    @Column({ type: 'text', nullable: true })
    message: string;

    @Column("simple-json")
    data: any;

    @Column({ default: 0 })
    isRead: Number;
    
}