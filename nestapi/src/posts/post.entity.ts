import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, JoinColumn, RelationCount } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from './../user/user.entity';
import { AgendaTopicsEntity } from './agenda-topics.entity';
import { PostCommentsEntity } from './post-comments.entity';
import { PostPhotosEntity } from './post-photos.entity';
import { PostVideosEntity } from './post-videos.entity';
import { AssetsEntity } from 'src/assets/assets.entity';
import { assert } from 'console';
import { PostBookmarksEntity } from './post-bookmarks.entity';
import { PostLikeEntity } from './post-like.entity';
import { PostDislikeEntity } from './post-dislike.entity';
@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {

    @Column({ length: 250, nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(type => AgendaTopicsEntity, topic => topic.posts)
    topic: AgendaTopicsEntity;

    // @OneToMany(type => PostPhotosEntity, pp => pp.post)
    // photos: PostPhotosEntity[];

    // @OneToMany(type => PostPhotosEntity, pp => pp.post)
    // photos: PostPhotosEntity[];

    @ManyToMany(type => AssetsEntity, assets => assets.id)
    @JoinTable()
    photos: AssetsEntity[];


    // @OneToMany(type => AssetsEntity, assets => assets.post)
    // @JoinColumn()
    // photos: AssetsEntity[];


    @OneToMany(type => PostVideosEntity, pv => pv.post, { eager: true, cascade: true, onDelete: 'CASCADE' })
    videos: PostVideosEntity[];

    @ManyToOne(type => UserEntity, user => user.posts)
    createdBy: UserEntity;

    @OneToMany(type => PostCommentsEntity, pc => pc.post)
    comments: PostCommentsEntity[];

    @Column({ default: 0 })
    isPublished: number;

    @Column({ default: 0 })
    isDeleted: number;

    @OneToMany(type => PostBookmarksEntity, pc => pc.post)
    bookmark: PostBookmarksEntity[];

    @RelationCount((post: PostEntity) => post.bookmark)
    bookmarkCount: number;

    // @RelationCount((post: PostEntity) => post.likes)
    // likeCount: number;

    @OneToMany(type => PostLikeEntity, pld => pld.post)
    like: PostLikeEntity[];

    @OneToMany(type => PostDislikeEntity, pdld => pdld.post)
    dislike: PostDislikeEntity[];

    @RelationCount((post: PostEntity) => post.like)
    likeCount: number;

    @RelationCount((post: PostEntity) => post.dislike)
    dislikeCount: number;

    // members: UserEntity[];
    // @ManyToOne(type => UserEntity, user => user.groups)
    // createdBy: UserEntity;
}
