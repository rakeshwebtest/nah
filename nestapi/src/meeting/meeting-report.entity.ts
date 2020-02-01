import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { MeetingEntity } from './meeting.entity';
import { UserEntity } from 'src/user/user.entity';
@Entity({ name: 'meeting_report' })
export class MeetingReportEntity extends BaseEntity {
  
    @ManyToOne(type => MeetingEntity, meeting => meeting.reports)
    meeting: MeetingEntity;

    @Column({ length: 1250, nullable: true })
    comment: string;



    // @Column()
    // userId: number;
    // @Column()
    // userId: number; 
    
    @ManyToOne(type => UserEntity, user => user.reports)
    createdBy: UserEntity;

}
