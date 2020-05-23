import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BaseEntity } from '../shared/base.entity'
import { AgendaEntity } from './agenda.entity';
@Entity({ name: 'agenda_topics' })
export class AgendaTopicsEntity extends BaseEntity {

    @Column({ length: 100 })
    name: string;

    @ManyToOne(type => AgendaEntity, agenda => agenda.topics, { onDelete: 'CASCADE' })
    agenda: AgendaEntity;


    @Column({ default: 0 })
    isDeleted: number;

}
