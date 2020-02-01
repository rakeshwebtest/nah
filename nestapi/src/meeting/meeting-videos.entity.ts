import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { MeetingEntity } from './meeting.entity';
@Entity({ name: 'meeting_videos' })
export class MeetingVideosEntity extends BaseEntity {
  
    @ManyToOne(type => MeetingEntity, meeting => meeting.videos, { onDelete: 'CASCADE' })
    meeting: MeetingEntity;

    @Column({ length: 1250, nullable: true })
    videoPath: string;



    // @Column()
    // userId: number;
    // @Column()
    // userId: number; 

}
