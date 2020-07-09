import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { PostEntity } from './post.entity';
import { AssetsEntity } from 'src/assets/assets.entity';
@Entity({ name: 'post_photos' })
export class PostPhotosEntity extends BaseEntity {

    @ManyToOne(type => PostEntity, post => post.photos, { onDelete: 'CASCADE' })
    post: PostEntity;

    // @Column({ length: 1250, nullable: true })
    // imagePath: string;

    @ManyToOne(type => AssetsEntity, asserts => asserts.id)
    asset: AssetsEntity;

    // @ManyToOne(type => PostEntity, post => post.photos, { onDelete: 'CASCADE' })
    // post: PostEntity;
    
    // @Column()
    // userId: number;
    // @Column()
    // userId: number; 

}
