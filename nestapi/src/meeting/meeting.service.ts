import { Injectable } from '@nestjs/common';
import { MeetingEntity } from './meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UserEntity } from 'src/user/user.entity';
import { GroupEntity } from 'src/group/group.entity';

@Injectable()
export class MeetingService {
    constructor(@InjectRepository(MeetingEntity) private readonly meetingRepository: Repository<MeetingEntity>) {

    }

    async getMeetings(): Promise<MeetingEntity[]> {
        return getRepository(MeetingEntity)
            .createQueryBuilder('m')
            .select(["m", "user.displayName", "member.id", "member.displayName"])
            .leftJoin("m.user", 'user')
            .leftJoin("m.members", 'member')
            .getMany();
         // return  this.meetingRepository.find({relations:["user","members"]});

    }
    async createMeeting(meeting:CreateMeetingDto):Promise<MeetingEntity>{
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
        _meeting.user = new UserEntity();
        _meeting.user.id = userId;

        // group
        _meeting.group = new GroupEntity();
        _meeting.group.id = groupId;
        console.log('_meeting',_meeting)
        return this.meetingRepository.save(_meeting);
        // return data;

    }

}
