import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, ManyToMany, Index } from 'typeorm';
import { BaseEntity } from './../shared/base.entity';
import { GroupEntity } from 'src/group/group.entity';
import { GroupFollowEntity } from 'src/group/group-follows.entity';
import { MeetingEntity } from 'src/meeting/meeting.entity';
import { PostEntity } from 'src/posts/post.entity';
import { CityEntity } from 'src/city/city.entity';
import { MeetingCommentsEntity } from 'src/meeting/meeting-comments.entity';
import { MeetingReportEntity } from 'src/meeting/meeting-report.entity';
import { MeetingMembersEntity } from 'src/meeting/meeting-members.entity';
import { MeetingVideosEntity } from 'src/meeting/meeting-videos.entity';
import { MeetingPhotosEntity } from 'src/meeting/meeting-photos.entity';
import { AgendaEntity } from 'src/posts/agenda.entity';
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {

    @Column({ length: 25, nullable: true })
    displayName: string;

    @Index({ unique: true })
    @Column({ length: 250 })
    email: string;

    @Column({ length: 250, default: "/assets/images/avatar.png" })
    imageUrl: string;

    @Column({ length: 25, default: 'google' })
    provider: string;

    @Column({ length: 25, nullable: true, select: false })
    password: string;

    @Column({ length: 25, default: 'user' })
    role: string;

    @Column({ length: 25, default: 'active' })
    status: string;

    @Column({ type: 'text', nullable: true, select: false })
    idToken: string;

    @Column({ length: 25, nullable: true })
    typeOfNoer: string;


    // @Column({ length: 25, default: '' })
    // country: string;

    @ManyToOne(type => CityEntity, city => city.users, { onDelete: 'CASCADE' })
    city: CityEntity;

    // @OneToMany(type => GroupEntity, group => group.createBy)
    // groups: GroupEntity[];

    @OneToMany(type => GroupFollowEntity, gf => gf.user, { onDelete: 'CASCADE' })
    following: GroupFollowEntity[];

    @OneToMany(type => MeetingEntity, meeting => meeting.createdBy, { onDelete: 'CASCADE' })
    meetings: MeetingEntity[];

    @OneToMany(type => MeetingVideosEntity, mv => mv.createdBy, { onDelete: 'CASCADE' })
    MeetingVidoes: MeetingVideosEntity[];

    @OneToMany(type => MeetingPhotosEntity, mp => mp.createdBy, { onDelete: 'CASCADE' })
    MeetingPhotos: MeetingPhotosEntity[];

    @OneToMany(type => MeetingMembersEntity, mm => mm.user, { onDelete: 'CASCADE' })
    meetingMember: MeetingMembersEntity[];

    @OneToMany(type => PostEntity, post => post.createdBy, { onDelete: 'CASCADE' })
    posts: PostEntity[];


    @OneToMany(type => GroupEntity, group => group.createdBy, { onDelete: 'CASCADE' })
    groups: GroupEntity[];

    @OneToMany(type => AgendaEntity, agenda => agenda.createdBy, { onDelete: 'CASCADE' })
    agenda: AgendaEntity[];

    @OneToMany(type => MeetingCommentsEntity, mc => mc.createdBy, { onDelete: 'CASCADE' })
    comments: MeetingCommentsEntity[];

    @OneToMany(type => MeetingReportEntity, mr => mr.createdBy, { onDelete: 'CASCADE' })
    reports: MeetingReportEntity[];

}
