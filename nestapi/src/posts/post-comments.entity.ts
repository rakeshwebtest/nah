import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { PostEntity } from './post.entity';
import { PostCommentReplyEntity } from './post-comment-reply.entity';
@Entity({ name: 'post_comments' })
export class PostCommentsEntity extends BaseEntity {

    @Column({ length: 250, nullable: true })
    comment: string;

    @ManyToOne(type => PostEntity, post => post.comments, { onDelete: 'CASCADE' })
    post: PostEntity;

    @OneToMany(type => PostCommentReplyEntity, pcr => pcr.postComment)
    replys: PostCommentReplyEntity[];

    // @Column()
    // userId: number;
    // @Column()
    // userId: number;

    @ManyToOne(type => UserEntity, user => user.comments, { onDelete: 'CASCADE' })
    createdBy: UserEntity;

}
