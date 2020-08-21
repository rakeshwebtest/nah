import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn, RelationCount } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BaseEntity } from '../shared/base.entity'
import { AgendaEntity } from './agenda.entity';
import { PostEntity } from './post.entity';
@Entity({ name: 'agenda_topics' })
export class AgendaTopicsEntity extends BaseEntity {

    @Column({ length: 100 })
    name: string;

    @ManyToOne(type => AgendaEntity, agenda => agenda.topics, { onDelete: 'CASCADE' })
    agenda: AgendaEntity;

    @OneToMany(type => PostEntity, post => post.topic)
    posts: PostEntity[];

    @RelationCount((topic: AgendaTopicsEntity) => topic.posts)
    postCount: number;

    @ManyToOne(type => UserEntity, user => user.topic, { eager: true, onDelete: 'CASCADE' })
    createdBy: UserEntity;



    @Column({ default: 0 })
    isDeleted: number;

}
