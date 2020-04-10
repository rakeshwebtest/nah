import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, ManyToMany, Index } from 'typeorm';
import { BaseEntity } from './../shared/base.entity';
import { GroupEntity } from 'src/group/group.entity';
import { GroupFollowEntity } from 'src/group/group-follows.entity';
import { MeetingEntity } from 'src/meeting/meeting.entity';
import { CityEntity } from 'src/city/city.entity';
import { MeetingCommentsEntity } from 'src/meeting/meeting-comments.entity';
import { MeetingReportEntity } from 'src/meeting/meeting-report.entity';
import { MeetingMembersEntity } from 'src/meeting/meeting-members.entity';
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

    @ManyToOne(type => CityEntity, city => city.users)
    city: CityEntity;

    // @OneToMany(type => GroupEntity, group => group.createBy)
    // groups: GroupEntity[];

    @OneToMany(type => GroupFollowEntity, gf => gf.user)
    following: GroupFollowEntity[];

    @OneToMany(type => MeetingEntity, meeting => meeting.createdBy)
    meetings: MeetingEntity[];

    @OneToMany(type => MeetingMembersEntity, mm => mm.user)
    meetingMember: MeetingMembersEntity[];
    

    @OneToMany(type => GroupEntity, group => group.createdBy)
    groups: GroupEntity[];

    @OneToMany(type => MeetingCommentsEntity, mc => mc.createdBy)
    comments: MeetingCommentsEntity[];

    @OneToMany(type => MeetingReportEntity, mr => mr.createdBy)
    reports: MeetingReportEntity[];

}
