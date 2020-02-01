import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { BaseEntity } from './../shared/base.entity';
import { GroupEntity } from 'src/group/group.entity';
import { GroupFollowEntity } from 'src/group/group-follows.entity';
import { MeetingEntity } from 'src/meeting/meeting.entity';
import { CityEntity } from 'src/city/city.entity';
import { MeetingCommentsEntity } from 'src/meeting/meeting-comments.entity';
import { MeetingReportEntity } from 'src/meeting/meeting-report.entity';
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {

    @Column({ length: 25, nullable: true })
    displayName: string;

    @Column({ length: 250 })
    email: string;

    @Column({ length: 250, nullable: true })
    imageUrl: string;

    @Column({ length: 25, default:'google' })
    provider: string;

    @Column({ length: 25, nullable: true })
    password: string;

    @Column({ length: 25, default:'user' })
    role: string;

    @Column({ type: 'text', nullable: true })
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

    @OneToMany(type => MeetingEntity, meeting => meeting.createdBy) // note: we will create author property in the Photo class below
    meetings: MeetingEntity[];

    @OneToMany(type => MeetingCommentsEntity, mc => mc.createdBy) // note: we will create author property in the Photo class below
    comments: MeetingCommentsEntity[];


    @OneToMany(type => MeetingReportEntity, mr => mr.createdBy) // note: we will create author property in the Photo class below
    reports: MeetingReportEntity[];

}
