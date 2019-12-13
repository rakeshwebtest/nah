import { Injectable } from '@nestjs/common';
import { GroupEntity } from './group.entity';
import { GroupFollowEntity } from './group-follows.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupFollowDto } from './dto/group-follow.dto';
@Injectable()
export class GroupService {

    constructor(@InjectRepository(GroupEntity) private readonly groupRepository: Repository<GroupEntity>,
        @InjectRepository(GroupEntity) private readonly groupFollowRepository: Repository<GroupFollowEntity>
    ) { }

    async getGroups(): Promise<GroupEntity[]> {
        return this.groupRepository.find();
    }
    async updateGroup(group: CreateGroupDto) {
        return this.groupRepository.save(group);
    }
    async updateFollowGroup(groupFollows: GroupFollowDto[]) {
        // return this.groupRepository.save();
      return  await getConnection()
            .createQueryBuilder()
            .insert()
            .into(GroupFollowEntity)
            .values(groupFollows)
            .execute();
    }
}
