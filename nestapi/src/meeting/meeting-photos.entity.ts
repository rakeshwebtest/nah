import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { MeetingEntity } from './meeting.entity';
@Entity({ name: 'meeting_photos' })
export class MeetingPhotosEntity extends BaseEntity {
  
    @ManyToOne(type => MeetingEntity, meeting => meeting.photos, { onDelete: 'CASCADE' })
    meeting: MeetingEntity;

    @Column({ length: 1250, nullable: true })
    imagePath: string;

    @ManyToOne(type => UserEntity, user => user.MeetingPhotos)
    createdBy: UserEntity;


    // @Column()
    // userId: number;
    // @Column()
    // userId: number; 

}
