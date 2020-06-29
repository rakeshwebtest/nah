import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { PostEntity } from './post.entity';
@Entity({ name: 'post_bookmarks' })
export class PostBookmarksEntity extends BaseEntity {
  
    @ManyToOne(type => PostEntity, post => post, { onDelete: 'CASCADE' })
    post: PostEntity;

    // @Column()
    // userId: number;
    // @Column()
    // userId: number;

    @ManyToOne(type => UserEntity, user => user, { onDelete: 'CASCADE' })
    user: UserEntity;

}
