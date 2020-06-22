import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from './../user/user.entity';
import { PostCommentsEntity } from './post-comments.entity';
import { PostPhotosEntity } from './post-photos.entity';
import { PostVideosEntity } from './post-videos.entity';
@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {

    @Column({ length: 250, nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'timestamp', name: 'postDate', default: () => 'LOCALTIMESTAMP' })
    postDate: string;

    @ManyToOne(type => UserEntity, user => user.posts)
    createdBy: UserEntity;

    @OneToMany(type => PostPhotosEntity, pp => pp.post)
    photos: PostPhotosEntity[];

    @OneToMany(type => PostVideosEntity, pv => pv.post)
    videos: PostVideosEntity[];

    @OneToMany(type => PostCommentsEntity, pc => pc.post)
    comments: PostCommentsEntity[];

    @Column({ default: 0 })
    isPublished: number;

    @Column({ default: 0 })
    isDeleted: number;


    // members: UserEntity[];
    // @ManyToOne(type => UserEntity, user => user.groups)
    // createdBy: UserEntity;
}
