import { Injectable } from '@nestjs/common';
import { GroupEntity } from './group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
@Injectable()
export class GroupService {

    constructor(@InjectRepository(GroupEntity) private readonly groupRepository: Repository<GroupEntity>) { }

    async getGroups(): Promise<GroupEntity[]> {
        return this.groupRepository.find();
    }
    async updateGroup(group: CreateGroupDto) {
        return this.groupRepository.save(group);
    }
}
