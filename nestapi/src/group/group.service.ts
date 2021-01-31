import { Injectable } from '@nestjs/common';
import { GroupEntity } from './group.entity';
import { GroupFollowEntity } from './group-follows.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getRepository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupFollowDto } from './dto/group-follow.dto';
import { UserEntity } from 'src/user/user.entity';
import { APP_CONFIG } from 'src/config';
import { NotificationsService } from 'src/notifications/notifications.service';
@Injectable()
export class GroupService {

    constructor(@InjectRepository(GroupEntity) private readonly groupRepository: Repository<GroupEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(GroupFollowEntity) private readonly groupFollowRepository: Repository<GroupFollowEntity>,
        private notificationService: NotificationsService
    ) { }

    async getGroups(query, sessionUser): Promise<any> {
        const take = query.take || 100;
        const skip = query.skip || 0;
        const userId = (query.userId) ? query.userId : sessionUser.id;

        const db = getRepository(GroupEntity)
            .createQueryBuilder('group')
            .select(["group", "gf", "gm", "createdBy", "user"])
            .leftJoin('group.createdBy', 'createdBy')
            .leftJoin('group.followers', 'gf')
            .leftJoin('group.meetings', 'gm')
            .loadRelationCountAndMap('group.followersCount', 'group.followers', 'gf')
            .leftJoin('gf.user', 'user')
            .orderBy({ "group.createdDate": "DESC" });


        if (sessionUser.role === 'admin') {
            // get user 

        } else {
            if (userId && query.createdBy) {
                db.andWhere('group.createdBy = :id', { id: userId });
            } else {
                db.where('(group.isDeleted != 1)');
            }

        }
        if (query.search) {
            db.andWhere("(group.name like :name)", { name: '%' + query.search + '%' });
        } else {
            if (userId && query.notCreatedBy) {
                db.where('(createdBy.id != :id)', { id: userId });
            }
        }

        db.take(take);
        db.skip(skip);


        const [result, total] = await db.getManyAndCount();
        result.map(group => {
            group.meetings.map(meeting => {
                return this.bindFileBasePath(meeting);
            });
        });
        return {
            data: result,
            count: total
        }

    }
    async getGroupsByUserId(userId): Promise<any[]> {
        let data = await <any>getRepository(GroupEntity)
            .createQueryBuilder('group')
            .select(["group", "gf", "gm", "user"])
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

    async getGroupById(groupId): Promise<any[]> {
        const db = getRepository(GroupEntity)
            .createQueryBuilder('group')
            .select(["group", "gf", "gm", "createdBy", "user"])
            .leftJoin('group.createdBy', 'createdBy')
            .leftJoin('group.followers', 'gf')
            .leftJoin('group.meetings', 'gm')
            .loadRelationCountAndMap('group.followersCount', 'group.followers', 'gf')
            .leftJoin('gf.user', 'user').where('group.id = :id', { id: groupId });

        const data = await db.getOne();
        return this.bindFileBasePath(data);

    }
    async getMembersByGroupId(groupId) {
        return getRepository(GroupFollowEntity)
            .createQueryBuilder('gf')
            .leftJoinAndSelect("gf.user", 'user')
            .where('gf.groupId = :groupId', { groupId })
            .getMany();
    }
    async updateGroup(groupDto: CreateGroupDto, sessionUser) {
        const group = new GroupEntity();
        group.name = groupDto.name;
        group.createdBy = new UserEntity();
        group.createdBy.id = sessionUser.id;
        const groupDetails = await this.groupRepository.save(group);
        if (groupDetails.id)
            this.notificationService.send(groupDetails.createdBy.id, null, 'group-create', groupDetails);
        return groupDetails;
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
        const group: any = await this.getGroupById(groupFollow.groupId);
        const followMember = new GroupFollowEntity();
        followMember.group = new GroupEntity();
        followMember.group.id = groupFollow.groupId;
        followMember.user = new UserEntity();
        followMember.user.id = groupFollow.userId;
        const isFollower = await this.isFollower(followMember);
        if (isFollower) {
            await this.groupFollowRepository.delete(isFollower);
            return { message: 'Unfollowed successfully', success: true, isFollower };
        } else {
            const data = await this.groupFollowRepository.save(followMember);
            this.notificationService.send(followMember.user.id, group.createdBy.id, 'group-follow', group);
            return { message: 'Followed successfully', success: true, data };
        }
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
            where: [{ name: group.name }],
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
                meeting.imageUrl = APP_CONFIG.SERVERBASEPATH + meeting.imageUrl;
            if (meeting.photos) {
                meeting.photos.map(p => {
                    if (p.imagePath)
                        p.imagePath = APP_CONFIG.SERVERBASEPATH + p.imagePath;
                });
            }

        }
        return meeting;
    }
}
