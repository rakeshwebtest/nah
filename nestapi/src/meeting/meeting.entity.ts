import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from './../user/user.entity';
import { GroupEntity } from './../group/group.entity';
import { MeetingMembersEntity } from './meeting-members.entity'
import { CityEntity } from 'src/city/city.entity';
import { MeetingCommentsEntity } from './meeting-comments.entity';
@Entity({ name: 'meeting' })
export class MeetingEntity extends BaseEntity {

    @Column({ length: 250, nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    agenda: string;

    @Column({ type: 'timestamp', name: 'meetingDate', default: () => 'LOCALTIMESTAMP' })
    meetingDate: string;

    @Column({ type: 'timestamp', name: 'endDate', default: () => 'LOCALTIMESTAMP' })
    endDate: string;

    @Column({ length: 250, nullable: true })
    location: string;

    @Column({ type: 'timestamp', name: 'startTime', default: () => 'LOCALTIMESTAMP' })
    startTime: string;

    @Column({ type: 'timestamp', name: 'endTime', default: () => 'LOCALTIMESTAMP' })
    endTime: string;

    @Column({ length: 1250, nullable: true })
    imageUrl: string;

    @ManyToOne(type => CityEntity, city => city.meetings)
    city: CityEntity;

    @ManyToOne(type => GroupEntity, group => group.meetings)
    group: GroupEntity;

    @ManyToOne(type => UserEntity, user => user.meetings)
    createdBy: UserEntity;

    @OneToMany(type => MeetingMembersEntity, mm => mm.meeting)
    members: MeetingMembersEntity[];

    @OneToMany(type => MeetingCommentsEntity, mc => mc.meeting)
    comments: MeetingCommentsEntity[];

    @Column({ default: 0 })
    isPublished: number;
    // @ManyToMany(type => UserEntity, user => user.id)
    // @JoinTable()
    // members: UserEntity[];
    // @ManyToOne(type => UserEntity, user => user.groups)
    // createdBy: UserEntity;
}
