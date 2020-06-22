import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { PostCommentsEntity } from './post-comments.entity';
@Entity({ name: 'post_comment_reply' })
export class PostCommentReplyEntity extends BaseEntity {

    @Column({ length: 250, nullable: true })
    comment: string;

    // @Column()
    // userId: number;
    // @Column()
    // userId: number;
    @ManyToOne(type => PostCommentsEntity, mc => mc.replys, { onDelete: 'CASCADE' })
    postComment: PostCommentsEntity;

    @ManyToOne(type => UserEntity, user => user.comments, { onDelete: 'CASCADE' })
    createdBy: UserEntity;

}
