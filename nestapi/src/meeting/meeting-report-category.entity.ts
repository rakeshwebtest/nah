import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { MeetingEntity } from './meeting.entity';
import { UserEntity } from 'src/user/user.entity';
import { MeetingReportEntity } from './meeting-report.entity';
@Entity({ name: 'meeting_report_category' })
export class MeetingReportCateogryEntity extends BaseEntity {
  

    @Column()
    name: string;

    @OneToMany(type => MeetingReportEntity, mr => mr.category)
    reports: MeetingReportEntity[];

}
