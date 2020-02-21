import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from './../user/user.entity';
import { GroupEntity } from './../group/group.entity';
import { MeetingMembersEntity } from './meeting-members.entity'
import { CityEntity } from 'src/city/city.entity';
import { MeetingCommentsEntity } from './meeting-comments.entity';
import { MeetingPhotosEntity } from './meeting-photos.entity';
import { MeetingVideosEntity } from './meeting-videos.entity';
import { MeetingReportEntity } from './meeting-report.entity';
@Entity({ name: 'meeting' })
export class MeetingEntity extends BaseEntity {

    @Column({ length: 250, nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    agenda: string;

    @Column({ type: 'text', nullable: true })
    contactInfo: string;

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

    @Column({ length: 1250, default:'uploads/logo.png' })
    imageUrl: string;

    @ManyToOne(type => CityEntity, city => city.meetings)
    city: CityEntity;

    @ManyToOne(type => GroupEntity, group => group.meetings, { onDelete: 'CASCADE' })
    group: GroupEntity;

    @ManyToOne(type => UserEntity, user => user.meetings)
    createdBy: UserEntity;

    @OneToMany(type => MeetingMembersEntity, mm => mm.meeting)
    members: MeetingMembersEntity[];

    @OneToMany(type => MeetingPhotosEntity, mm => mm.meeting)
    photos: MeetingPhotosEntity[];

    @OneToMany(type => MeetingVideosEntity, mm => mm.meeting)
    videos: MeetingPhotosEntity[];

    @OneToMany(type => MeetingCommentsEntity, mc => mc.meeting)
    comments: MeetingVideosEntity[];

    @OneToMany(type => MeetingReportEntity, mr => mr.meeting)
    reports: MeetingReportEntity[];

    @Column({ default: 0 })
    isPublished: number;

    @Column({ default: 0 })
    isDeleted: number;

    // members: UserEntity[];
    // @ManyToOne(type => UserEntity, user => user.groups)
    // createdBy: UserEntity;
}
