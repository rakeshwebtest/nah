import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
@Entity({ name: 'meeting_members' })
export class MeetingEntity extends BaseEntity {

    @Column()
    meetingId: number;

    @Column()
    userId: number;
}
