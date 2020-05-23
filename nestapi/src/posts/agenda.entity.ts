import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BaseEntity } from '../shared/base.entity'
import { AgendaTopicsEntity } from './agenda-topics.entity';
@Entity({ name: 'agenda' })
export class AgendaEntity extends BaseEntity {

    @Column({ length: 100, default: 'draft' })
    status: string;

    @Column({ type: 'timestamp', name: 'startDate', default: () => 'CURRENT_TIMESTAMP' })
    startDate: Date;

    @Column({ type: 'timestamp', name: 'endDate', default: () => 'CURRENT_TIMESTAMP' })
    endDate: Date;

    @OneToMany(type => AgendaTopicsEntity, topics => topics.agenda, { eager: true,onDelete: 'CASCADE',cascade: ["insert","update","remove"] })
    topics: AgendaTopicsEntity[];

    @ManyToOne(type => UserEntity, user => user.agenda, {eager: true, onDelete: 'CASCADE' })
    createdBy: UserEntity;

    @Column({ default: 0 })
    isDeleted: number;
    
    @Column({ default: 0 })
    isPublish: number;

}
