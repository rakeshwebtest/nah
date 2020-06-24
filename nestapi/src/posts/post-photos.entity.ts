import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { PostEntity } from './post.entity';
@Entity({ name: 'post_photos' })
export class PostPhotosEntity extends BaseEntity {
  
    @ManyToOne(type => PostEntity, post => post.photos, { onDelete: 'CASCADE' })
    post: PostEntity;

    @Column({ length: 1250, nullable: true })
    imagePath: string;

    @ManyToOne(type => UserEntity, user => user.MeetingPhotos)
    createdBy: UserEntity;


    // @Column()
    // userId: number;
    // @Column()
    // userId: number; 

}
