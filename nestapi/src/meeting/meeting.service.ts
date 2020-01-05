import { Injectable } from '@nestjs/common';
import { MeetingEntity } from './meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UserEntity } from 'src/user/user.entity';
import { GroupEntity } from 'src/group/group.entity';
import { MeetingMembersEntity } from './meeting-members.entity';

@Injectable()
export class MeetingService {
    constructor(@InjectRepository(MeetingEntity) private readonly meetingRepository: Repository<MeetingEntity>,
        @InjectRepository(MeetingMembersEntity) private readonly meetingMembersRepository: Repository<MeetingEntity>) {

    }

    async getMeetings(): Promise<MeetingEntity[]> {
        return getRepository(MeetingEntity)
            .createQueryBuilder('m')
            .select(["m","group", "u.id", "u.displayName", "u.imageUrl", "mm", "user.id", "user.displayName", "user.imageUrl"])
            .leftJoin('m.createdBy', 'u')
            .leftJoin('m.group', 'group')
            .leftJoin("m.members", 'mm')
            .leftJoin("mm.user", 'user')
            .getMany();

        // return  this.meetingRepository.find({relations:["user","members"]});

    }
    /**
     * createing meeting
     */
    async createMeeting(meeting: CreateMeetingDto): Promise<MeetingEntity> {
        const _meeting = new MeetingEntity();
        _meeting.title = meeting.title;
        _meeting.agenda = meeting.agenda;
        _meeting.meetingDate = meeting.meetingDate;
        _meeting.startTime = meeting.startTime;
        _meeting.endTime = meeting.endTime;
        _meeting.imageUrl = meeting.imageUrl;

        const userId = parseInt(meeting.createdBy);
        const groupId = parseInt(meeting.groupId);
        // user 
        _meeting.createdBy = new UserEntity();
        _meeting.createdBy.id = userId;

        // group
        _meeting.group = new GroupEntity();
        _meeting.group.id = groupId;
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
            return { message: 'successfully Un join member', isMember };
        } else {
            const data = await this.meetingMembersRepository.save(meetingMember);
            return { message: 'successfully Followed Group', data };
        }
    }

}
