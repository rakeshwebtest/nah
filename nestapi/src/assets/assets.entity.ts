import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { PostEntity } from 'src/posts/post.entity';

@Entity({ name: 'asset' })
export class AssetsEntity extends BaseEntity {

    @Column() originalName: string;
    @Column() fileName: string;
    @Column('varchar') type: string;
    @Column() mimeType: string;
    @Column() fileSize: number;
    @Column() source: string;

    @ManyToOne(type => PostEntity, post => post.photos, { onDelete: 'CASCADE' })
    post: PostEntity;

}
