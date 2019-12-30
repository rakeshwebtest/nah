import { Injectable } from '@nestjs/common';
import { MeetingEntity } from './meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class MeetingService {
    constructor(@InjectRepository(MeetingEntity) private readonly meetingRepository: Repository<MeetingEntity>) {

    }

    async getGroups(): Promise<MeetingEntity[]> {
        return getRepository(MeetingEntity)
        .createQueryBuilder('m')
        .select(["m","user.displayName","member.id","member.displayName"])
        .leftJoin("m.user", 'user')
        .leftJoin("m.members", 'member')
        .getMany();
        // return  this.meetingRepository.find({relations:["user","members"]});

    }

}
