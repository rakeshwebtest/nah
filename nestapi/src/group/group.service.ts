import { Injectable } from '@nestjs/common';
import { GroupEntity } from './group.entity';
import { GroupFollowEntity } from './group-follows.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getRepository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupFollowDto } from './dto/group-follow.dto';
import { UserEntity } from 'src/user/user.entity';
@Injectable()
export class GroupService {

    constructor(@InjectRepository(GroupEntity) private readonly groupRepository: Repository<GroupEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(GroupFollowEntity) private readonly groupFollowRepository: Repository<GroupFollowEntity>
    ) { }

    async getGroups(): Promise<any[]> {
        const groups = await <any>this.groupRepository.find();
        for (let index = 0; index < groups.length; index++) {
            const group = groups[index];
            group.followers = await this.getMembersByGroupId(group.id);
        }
        return groups;
    }
    async getMembersByGroupId(groupId) {
        return getRepository(GroupFollowEntity)
            .createQueryBuilder('gf')
            .leftJoinAndSelect("gf.user", 'user')
            .where('gf.groupId = :groupId', { groupId })
            .getMany();
    }
    async updateGroup(group: CreateGroupDto) {
        return this.groupRepository.save(group);
    }
    async getGroupById(groupId: number): Promise<GroupEntity> {
        return await this.groupRepository.findOne({
            where: [{ id: groupId }],
        });
    }

    async isFollower(groupFollow: GroupFollowEntity): Promise<GroupFollowEntity> {
        return await this.groupFollowRepository.findOne(groupFollow);
    }
    async isFollower1(groupFollow: GroupFollowDto) {
        return getRepository(GroupFollowEntity)
            .createQueryBuilder('gf')
            .where('gf.groupId = :groupId && gf.userId = :userId', { groupId:groupFollow.groupId,userId:groupFollow.userId })
            .getMany();
    }
    async follow(groupFollow: GroupFollowDto) {

        const user: UserEntity = await this.userRepository.findOne({ where: [{ id: groupFollow.userId }] });
        const followMember = new GroupFollowEntity();
        followMember.groupId = groupFollow.groupId;
        followMember.user = user;
        const isFollower = await this.isFollower(followMember);
        if (isFollower) {
            await this.groupFollowRepository.delete(isFollower);
            return { message: 'successfully Un Followed Group', isFollower };
        } else {
            const data = await this.groupFollowRepository.save(followMember);
            return { message: 'successfully Followed Group', data };
        }

        // return isFollower; // await this.groupFollowRepository.save(followMember);
        // const isFollower = await this.isFollower(followMember);
        // console.log('isFollower',isFollower);
        // if (isFollower) {
        //     const data: any = await this.unFollow(isFollower.id);
        //     if (data) {
        //         const group: any = await this.getGroupById(followMember.groupId);
        //         group.followersCount = group.followersCount - 1;
        //         this.updateGroup(group);
        //     }
        //     return { message: 'successfully Un Followed Group', data };
        //     // throw new HttpException({ message: 'Already followed group', errors: 'Already followed group' }, HttpStatus.BAD_REQUEST);
        // } else {
        //     const data: any = await this.groupFollowRepository.save(groupFollow);
        //     if (data) {
        //         const group: any = await this.getGroupById(followMember.groupId);
        //         group.followersCount = group.followersCount + 1;

        //         this.updateGroup(group);
        //     }
        //     return { message: 'successfully Followed Group', data };
        // }
    }
    async unFollow(id: number) {
        return this.groupFollowRepository.delete(id);
    }
    // bulk group followers insert
    async updateFollowGroup(groupFollows: GroupFollowDto[]) {
        // return this.groupRepository.save();
        return await getConnection()
            .createQueryBuilder()
            .insert()
            .into(GroupFollowEntity)
            .values(groupFollows)
            .execute();
    }
    async checkGroupName(group: CreateGroupDto): Promise<GroupEntity> {
        return await this.groupRepository.findOne({
            where: [{ name: group.name, createBy: group.createBy }],
        });
    }
}
