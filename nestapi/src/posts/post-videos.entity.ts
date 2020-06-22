import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { PostEntity } from './post.entity';
@Entity({ name: 'post_videos' })
export class PostVideosEntity extends BaseEntity {
  
    @ManyToOne(type => PostEntity, post => post.videos, { onDelete: 'CASCADE' })
    post: PostEntity;

    @Column({ length: 1250, nullable: true })
    videoPath: string;

    @ManyToOne(type => UserEntity, user => user.MeetingVidoes)
    createdBy: UserEntity;



    // @Column()
    // userId: number;
    // @Column()
    // userId: number; 

}
