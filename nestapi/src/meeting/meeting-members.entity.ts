import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { MeetingEntity } from './meeting.entity';
@Entity({ name: 'meeting_members' })
export class MeetingMembersEntity extends BaseEntity {
    @ManyToOne(type => MeetingEntity, meeting => meeting.members)
    meeting: MeetingEntity;

    // @Column()
    // userId: number;
    // @Column()
    // userId: number;

    @ManyToOne(type => UserEntity, user => user.meetingMember)
    user: UserEntity;
}
