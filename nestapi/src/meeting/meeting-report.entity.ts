import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { MeetingEntity } from './meeting.entity';
import { UserEntity } from 'src/user/user.entity';
import { MeetingReportCateogryEntity } from './meeting-report-category.entity';
@Entity({ name: 'meeting_report' })
export class MeetingReportEntity extends BaseEntity {
  
    @ManyToOne(type => MeetingEntity, meeting => meeting.reports, { onDelete: 'CASCADE' })
    meeting: MeetingEntity;

    @Column({ length: 1250, nullable: true })
    comment: string;



    // @Column()
    // userId: number;
    // @Column()
    // userId: number; 
    
    @ManyToOne(type => UserEntity, user => user.reports, { onDelete: 'CASCADE' })
    createdBy: UserEntity;

    @ManyToOne(type => MeetingReportCateogryEntity, c => c.reports, { onDelete: 'CASCADE' })
    category: MeetingReportCateogryEntity;

}
