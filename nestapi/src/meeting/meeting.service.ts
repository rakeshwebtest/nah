import { Injectable } from '@nestjs/common';
import { MeetingEntity } from './meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UserEntity } from 'src/user/user.entity';
import { GroupEntity } from 'src/group/group.entity';
import { MeetingMembersEntity } from './meeting-members.entity';
import { SERVERBASEPATH } from 'src/config';
import { CityEntity } from 'src/city/city.entity';
import { MeetingCommentsEntity } from './meeting-comments.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class MeetingService {
    constructor(@InjectRepository(MeetingEntity) private readonly meetingRepository: Repository<MeetingEntity>,
        @InjectRepository(MeetingCommentsEntity) private readonly meetingCommentRepository: Repository<MeetingCommentsEntity>,
        @InjectRepository(MeetingMembersEntity) private readonly meetingMembersRepository: Repository<MeetingEntity>) {

    }

    async getMeetings(query: any): Promise<MeetingEntity | MeetingEntity[]> {
        const db = getRepository(MeetingEntity)
            .createQueryBuilder('m')
            .select(["m", "group", "u.id", "u.displayName", "u.imageUrl", "mm",
                "user.id", "user.displayName", "user.imageUrl", "city",
                "mc", "mc_createdBy.id", "mc_createdBy.imageUrl", "mc_createdBy.displayName"])
            .leftJoin('m.createdBy', 'u')
            .leftJoin('m.city', 'city')
            .leftJoin('m.group', 'group')
            .leftJoin('group.followers', 'gf')
            .leftJoin('gf.user', 'gf_user')
            .leftJoin("m.members", 'mm')
            .leftJoin("m.comments", 'mc')
            .leftJoin("mc.createdBy", 'mc_createdBy')
            .leftJoin("mm.user", 'user')
            .orderBy({ "m.createdDate": "DESC", "mc.createdDate": "DESC" });

            // get meeting by group owner or group follower   
            db.where('gf_user.id= :id', { id: query.userId })
            .orWhere('group.createdBy= :id', { id: query.userId });

        if (query.type && query.type === 'upcoming') {
            db.where('m.meetingDate >= DATE(NOW())');
        }
        if (query.type && query.type === 'my-meeting') {
            db.where('u.id = :id', { id: query.userId })
        } 


        // get meeting details   
        if (query.meetingId) { // single meeting
            db.where('m.id = :meetingId', { meetingId: query.meetingId });
            const data: any = await db.getOne();
            data.imageUrl = SERVERBASEPATH + data.imageUrl;
            return data;
        } else {
            const data = await db.getMany(); // all meeting
            if (data) {
                data.map(meeting => {
                    if (meeting.imageUrl)
                        meeting.imageUrl = SERVERBASEPATH + meeting.imageUrl;
                });
            }
            return data;
        }
        // return  this.meetingRepository.find({relations:["user","members"]});

    }
    bindFileBasePath(data) {
        if (data) {
            data.map(meeting => {
                if (meeting.imageUrl)
                    meeting.imageUrl = SERVERBASEPATH + meeting.imageUrl;
            });
        }
    }
    /**
     * createing meeting
     */
    async createMeeting(meeting: CreateMeetingDto): Promise<MeetingEntity> {
        const _meeting = new MeetingEntity();
        _meeting.title = meeting.title;
        _meeting.agenda = meeting.agenda;
        _meeting.meetingDate = meeting.meetingDate;
        _meeting.endDate = meeting.endDate;
        _meeting.startTime = meeting.startTime;
        _meeting.endTime = meeting.endTime;
        _meeting.imageUrl = meeting.imageUrl;
        _meeting.location = meeting.location;

        const userId = parseInt(meeting.createdBy);
        const groupId = parseInt(meeting.groupId);
        // user 
        _meeting.createdBy = new UserEntity();
        _meeting.createdBy.id = userId;

        // group
        _meeting.group = new GroupEntity();
        _meeting.group.id = groupId;

        // city
        _meeting.city = new CityEntity();
        _meeting.city.id = parseInt(meeting.cityId);

        console.log('_meeting', _meeting)
        return this.meetingRepository.save(_meeting);
        // return data;

    }
    /**
     * join or unjoin meeting members 
     */
    async joinMember(meetingMemberDto: any) {
        const meetingMember = new MeetingMembersEntity();
        meetingMember.meeting = new MeetingEntity();
        meetingMember.meeting.id = meetingMemberDto.meetingId;
        meetingMember.user = new UserEntity();
        meetingMember.user.id = meetingMemberDto.userId;


        const isMember = await this.meetingMembersRepository.findOne(meetingMember);
        if (isMember) {
            await this.meetingMembersRepository.delete(isMember);
            return { message: 'Successfully Un-join Member', isMember };
        } else {
            const data = await this.meetingMembersRepository.save(meetingMember);
            return { message: 'Successfully Join Member', data };
        }
    }
    async addComment(commentDto: CommentDto) {
        const comment = new MeetingCommentsEntity();
        comment.createdBy = new UserEntity();
        comment.meeting = new MeetingEntity();
        comment.meeting.id = commentDto.meetingId;
        comment.createdBy.id = commentDto.userId;
        comment.comment = commentDto.comment;
        const data = await this.meetingCommentRepository.save(comment);
        return { message: 'Add Comment Successfully', data };
    }

}
