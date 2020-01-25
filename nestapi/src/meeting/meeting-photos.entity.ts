import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { MeetingEntity } from './meeting.entity';
@Entity({ name: 'meeting_photos' })
export class MeetingPhotosEntity extends BaseEntity {
  
    @ManyToOne(type => MeetingEntity, meeting => meeting.photos)
    meeting: MeetingEntity;

    @Column({ length: 1250, nullable: true })
    imagePath: string;



    // @Column()
    // userId: number;
    // @Column()
    // userId: number; 

}
