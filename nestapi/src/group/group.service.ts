import { Injectable } from '@nestjs/common';
import { GroupEntity } from './group.entity';
import { GroupFollowEntity } from './group-follows.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getRepository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupFollowDto } from './dto/group-follow.dto';
import { UserEntity } from 'src/user/user.entity';
import { SERVERBASEPATH } from 'src/config';
@Injectable()
export class GroupService {

    constructor(@InjectRepository(GroupEntity) private readonly groupRepository: Repository<GroupEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(GroupFollowEntity) private readonly groupFollowRepository: Repository<GroupFollowEntity>
    ) { }

    async getGroups(query): Promise<any> {
        const take = query.take || 100
        const skip = query.skip || 0

        const db = getRepository(GroupEntity)
            .createQueryBuilder('group')
            .select(["group", "gf", "gm", "user.id", "user.displayName", "user.imageUrl"])
            .leftJoin('group.followers', 'gf')
            .leftJoin('group.meetings', 'gm')
            .loadRelationCountAndMap('group.followersCount', 'group.followers', 'gf')
            .leftJoin('gf.user', 'user')
            .where('group.isDeleted != 1')
            .orderBy({ "group.createdDate": "DESC" });

        // get user 
        if(query.userId && query.createdBy){
            db.andWhere('group.createdBy = :id', { id: query.userId });
        }
        if(query.userId && query.notCreatedBy){
            db.where('group.createdBy != :id', { id: query.userId });
        }

        if (query.search) {
            db.where("group.name like :name", { name: '%' + query.search + '%' })
        }
        db.take(take);
        db.skip(skip);


        const [result, total] = await db.getManyAndCount();
        result.map(group => {
            group.meetings.map(meeting => {
                return this.bindFileBasePath(meeting);
            });
        });
        console.log(result);
        return {
            data: result,
            count: total
        }

    }

    async getGroupById(userId): Promise<any[]> {
        let data = await <any>getRepository(GroupEntity)
            .createQueryBuilder('group')
            .select(["group", "gf", "gm", "user.id", "user.displayName", "user.imageUrl"])
            .leftJoin('group.followers', 'gf')
            .leftJoin('group.meetings', 'gm')
            .leftJoin('gf.user', 'user')
            .where('group.createdBy = :id && group.isDeleted != 1', { id: userId })
            .orWhere('user.id= :id', { id: userId })
            .orderBy({ "group.createdDate": "DESC" })
            .getMany();

        data.map(group => {
            group.meetings.map(meeting => {
                return this.bindFileBasePath(meeting);
            });
        });
        return data;

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
    // async getGroupById(groupId: number): Promise<GroupEntity> {
    //     return await this.groupRepository.findOne({
    //         where: [{ id: groupId }],
    //     });
    // }

    async isFollower(groupFollow: GroupFollowEntity): Promise<GroupFollowEntity> {
        return await this.groupFollowRepository.findOne(groupFollow);
    }
    async isFollower1(groupFollow: GroupFollowDto) {
        return getRepository(GroupFollowEntity)
            .createQueryBuilder('gf')
            .where('gf.groupId = :groupId && gf.userId = :userId', { groupId: groupFollow.groupId, userId: groupFollow.userId })
            .getMany();
    }
    async follow(groupFollow: GroupFollowDto) {

        const user: UserEntity = await this.userRepository.findOne({ where: [{ id: groupFollow.userId }] });
        const followMember = new GroupFollowEntity();
        followMember.group = new GroupEntity();
        followMember.group.id = groupFollow.groupId;
        followMember.user = new UserEntity();
        followMember.user.id = groupFollow.userId;
        const isFollower = await this.isFollower(followMember);
        if (isFollower) {
            await this.groupFollowRepository.delete(isFollower);
            return { message: 'Successfully Un-Follow Group', isFollower };
        } else {
            const data = await this.groupFollowRepository.save(followMember);
            return { message: 'Successfully Follow Group', data };
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
            // .values(groupFollows)
            .execute();
    }
    async checkGroupName(group: CreateGroupDto): Promise<GroupEntity> {
        return await this.groupRepository.findOne({
            where: [{ name: group.name, createBy: group.createdBy }],
        });
    }
    async deleteGroup(groupId) {
        const group = new GroupEntity();
        group.isDeleted = 1;
        return await this.groupRepository.update(groupId, group);
    }
    bindFileBasePath(meeting) {
        if (meeting) {
            if (meeting.imageUrl)
                meeting.imageUrl = SERVERBASEPATH + meeting.imageUrl;
            if (meeting.photos) {
                meeting.photos.map(p => {
                    if (p.imagePath)
                        p.imagePath = SERVERBASEPATH + p.imagePath;
                });
            }

        }
        return meeting;
    }
}
