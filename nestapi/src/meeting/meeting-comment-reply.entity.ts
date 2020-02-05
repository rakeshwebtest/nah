import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { MeetingEntity } from './meeting.entity';
import { MeetingCommentsEntity } from './meeting-comments.entity';
@Entity({ name: 'meeting_comment_reply' })
export class MeetingCommentReplyEntity extends BaseEntity {

    @Column({ length: 250, nullable: true })
    comment: string;

    // @Column()
    // userId: number;
    // @Column()
    // userId: number;
    @ManyToOne(type => MeetingCommentsEntity, mc => mc.replys, { onDelete: 'CASCADE' })
    meetingComment: MeetingEntity;

    @ManyToOne(type => UserEntity, user => user.comments, { onDelete: 'CASCADE' })
    createdBy: UserEntity;

}
