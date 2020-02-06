import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';
import { UserEntity } from 'src/user/user.entity';
import { MeetingEntity } from './meeting.entity';
import { MeetingCommentReplyEntity } from './meeting-comment-reply.entity';
@Entity({ name: 'meeting_comments' })
export class MeetingCommentsEntity extends BaseEntity {

    @Column({ length: 250, nullable: true })
    comment: string;

    @ManyToOne(type => MeetingEntity, meeting => meeting.comments, { onDelete: 'CASCADE' })
    meeting: MeetingEntity;

    @OneToMany(type => MeetingCommentReplyEntity, mcr => mcr.meetingComment)
    replys: MeetingCommentReplyEntity[];

    // @Column()
    // userId: number;
    // @Column()
    // userId: number;

    @ManyToOne(type => UserEntity, user => user.comments, { onDelete: 'CASCADE' })
    createdBy: UserEntity;

}
