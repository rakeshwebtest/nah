import { Injectable, Inject, HttpException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, getRepository, getConnection } from 'typeorm';
import { UserEntity } from './user.entity';
import { SECRET } from '../config';
const jwt = require('jsonwebtoken');
import { UserRO } from './user.interface';
import { LoginUserDto } from './dto';
import { CreateUserDto, UserLIstQuery } from './dto/create-user.dto';

@Injectable()
export class UserService implements OnModuleInit {

    constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) { }
    async onModuleInit() {
        console.log('checking admin user');
        const user = await this.usersRepository.findOne({ where: { email: 'admin@nah.com' } });
        if (!user) {
            console.log('Addmin user not there so create admin user');
            const user: any = new UserEntity();
            user.email = 'admin@nah.com';
            user.password = 'nah@123';
            user.displayName = 'NAH';
            user.role = 'admin';
            await this.createUser(user);
            console.log('created user');
        }
    }
    async getUsers(query: UserLIstQuery): Promise<UserEntity[]> {
        const take = query.take || 5000;
        const skip = query.skip || 0;

        const db = getRepository(UserEntity)
            .createQueryBuilder("u").select(["u", "c"]);
        db.leftJoin('u.city', 'c');

        switch (query.type) {
            case 'following':
                db.leftJoinAndSelect('u.following', 'followers');
                db.andWhere('followers.id=:id', { id: query.userId });
                break;
            case 'followers':
                db.leftJoin('u.followers', 'followers');
                db.andWhere('followers.id=:id', { id: query.userId });
                break;
            case 'blocked':
                db.leftJoin('u.blocked', 'blocked');
                db.andWhere('blocked.id=:id', { id: query.userId });
                break;
            case 'meeting-members':
                db.leftJoinAndSelect('u.meetingMember', 'meetingMember');
                db.andWhere('meetingMember.meetings.id=:id', { id: query.meetingId });
                break;
            case 'group-followers':
                console.log('group followers', query.groupId);
                db.leftJoin('u.groupFollowing', 'groupFollowing');
                db.andWhere('groupFollowing.group.id=:id', { id: query.groupId });
                break;
            default:
                break;
        }

        if (query.search)
            db.where("(u.email like :name or u.displayName like :name)", { name: '%' + query.search + '%' })
        if (query.status)
            db.andWhere("u.status = :status", { status: query.status });

        db.take(take);
        db.skip(skip);
        return db.getMany();
    }

    async getUserByOne(_id: number): Promise<UserEntity> {
        return this.usersRepository.findOne({
            where: [{ id: _id }]
        });
    }
    async getUser(_id: number, sessionUser?: any): Promise<any> {
        const db = getRepository(UserEntity)
            .createQueryBuilder("u");
        db.select(["u", "c", "followers"]);
        db.leftJoin('u.city', 'c');
        db.loadRelationCountAndMap('u.commentsCount', 'u.comments', 'commentsCount');
        db.loadRelationCountAndMap('u.groupsCount', 'u.groups', 'groups');
        db.loadRelationCountAndMap('u.groupFollowingCount', 'u.following', 'followingCount');
        db.loadRelationCountAndMap('u.meetingsCount', 'u.meetings', 'mc', qb => qb.where('mc.isPublished = 1 && mc.isCanceled = 0'));
        db.loadRelationCountAndMap('u.meetingJoinCount', 'u.meetingMember', 'meetingsjoin')
            .leftJoin("u.followers", 'followers');
        if (sessionUser && sessionUser.id) {
            db.leftJoinAndMapOne("u.following", "u.following", "isFollowing", "isFollowing.id=" + sessionUser.id);
            db.leftJoinAndMapOne("u.blocked", "u.blocked", "isBlocked", "isFollowing.id=" + sessionUser.id);
        }

        db.where('u.id=:id', { id: _id });
        const data: any = await db.getOne();
        data.score = this.getScore(data);
        return data;
    }
    async getUserBasicInfo(_id: number[]) {
        const db = getRepository(UserEntity)
            .createQueryBuilder("u");
        db.select(["u", "u.fcmToken"]);
        db.where('u.id IN (:id)', { id: _id });
        // const data: any = await db.getMany();
        return db.getMany();
    }
    async checkUser(_email: string, password?: string): Promise<UserEntity> {
        // select: ['id', 'displayName','typeOfNeor'],

        let _where = [];
        if (password) {
            _where = [{ email: _email, password: password }];
        } else {
            _where = [{ email: _email }];
        }
        return this.usersRepository.findOne({
            select: ['id', 'email', 'displayName', 'typeOfNoer', 'imageUrl', 'city', 'status'],
            where: _where,
            relations: ["city"]
        });
    }

    async updateUser(user: LoginUserDto | CreateUserDto) {
        return this.usersRepository.save(user);
    }
    async changePassword(sessionUser, password) {
        const user = new UserEntity();
        user.id = sessionUser.id;
        user.password = password;
        return this.usersRepository.save(user);
    }

    async deleteUser(user: UserEntity) {
        this.usersRepository.delete(user);
    }
    async createUser(user: UserEntity) {
        return this.usersRepository.save(user);
    }
    async findById(id: number): Promise<any> {
        const user = await this.usersRepository.findOne({
            select: ['id', 'email', 'displayName', 'role', 'typeOfNoer', 'imageUrl', 'status'],
            where: [{ id: id }]
        });

        // if (!user) {
        //     const errors = { User: ' not found' };
        //     throw new HttpException({ errors }, 401);
        // }

        return user;
    }
    public generateJWT(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign(user.id, SECRET);
    }

    private buildUserRO(user: UserEntity) {
        const userRO = {
            displayName: user.displayName,
            email: user.email,
            token: this.generateJWT(user),
            imageUrl: user.imageUrl
        };

        return { user: userRO };
    }
    async follow(userId, followingId) {

        return getConnection()
            .createQueryBuilder()
            .relation(UserEntity, "following")
            .of(followingId)
            .add(userId);

    }
    async unfollow(userId, followingId) {

        return getConnection()
            .createQueryBuilder()
            .relation(UserEntity, "following")
            .of(followingId)
            .remove(userId);

    }
    async profileBlock(userId, profileId) {

        return getConnection()
            .createQueryBuilder()
            .relation(UserEntity, "blocked")
            .of(profileId)
            .add(userId);

    }
    async profileUnblock(userId, profileId) {

        return getConnection()
            .createQueryBuilder()
            .relation(UserEntity, "blocked")
            .of(profileId)
            .remove(userId);

    }
    public getScore(data: any) {
        const { commentsCount, groupsCount, groupFollowingCount, meetingJoinCount, meetingsCount } = data;
        let score = 100; // Become a Noer
        score += (groupsCount * 20); // create 1 group 20
        score += (meetingJoinCount * 5); // join 1 meeting 5
        score += (meetingsCount * 10); // create 1 meeting 10
        score += (commentsCount * 1); // give 1 comment 1
        score += (Math.trunc(groupsCount / 5) * 50); // When you created 5 group 50
        score += (Math.trunc(meetingsCount / 10) * 50); // When you create 10 meetings 50
        score += (Math.trunc(meetingJoinCount / 20) * 50); // when you joined 20 meetings 50
        score += (Math.trunc(commentsCount / 30) * 50); // when you gave 30 comments 50
        return score;
    }
}