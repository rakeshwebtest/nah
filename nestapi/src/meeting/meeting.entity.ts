import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from './../user/user.entity';
import { GroupEntity } from './../group/group.entity';
import {MeetingMembersEntity} from './meeting-members.entity'
@Entity({ name: 'meeting' })
export class MeetingEntity extends BaseEntity {

    @Column({ length: 250, nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    agenda: string;

    @Column({ type: 'timestamp', name: 'meetingDate', default: () => 'LOCALTIMESTAMP' })
    meetingDate: string;

    @Column({ type: 'timestamp', name: 'startTime', default: () => 'LOCALTIMESTAMP' })
    startTime: string;

    @Column({ type: 'timestamp', name: 'endTime', default: () => 'LOCALTIMESTAMP' })
    endTime: string;

    @Column({ length: 1250, nullable: true })
    imageUrl: string;

    @ManyToOne(type => GroupEntity, group => group.meetings)
    group: GroupEntity;

    @ManyToOne(type => UserEntity, user => user.meetings)
    createdBy: UserEntity;

    @OneToMany(type => MeetingMembersEntity, mm => mm.meeting)
    members: MeetingMembersEntity[];
    // @ManyToMany(type => UserEntity, user => user.id)
    // @JoinTable()
    // members: UserEntity[];
    // @ManyToOne(type => UserEntity, user => user.groups)
    // createdBy: UserEntity;
}
