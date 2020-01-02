import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
@Entity({ name: 'meeting' })
export class MeetingEntity extends BaseEntity {

    @Column({ length: 250, nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    agenda: string;

    @Column({ type: 'date', nullable: true })
    startDate: string;

    @Column({ type: 'date', nullable: true })
    endDate: string;

    @Column({ type: 'time', nullable: true })
    startTime: string;

    @Column({ type: 'time', nullable: true })
    endTime: string;

    @Column({ length: 250, nullable: true })
    imageUrl: string;

    @ManyToOne(type => UserEntity, user => user.meetings)
    user: UserEntity;

    @ManyToMany(type => UserEntity, user => user.id)
    @JoinTable()
    members: UserEntity[];

    // @ManyToOne(type => UserEntity, user => user.groups)
    // createdBy: UserEntity;
}
