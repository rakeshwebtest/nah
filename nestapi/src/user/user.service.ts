import { Injectable, Inject, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, getRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { SECRET } from '../config';
const jwt = require('jsonwebtoken');
import { UserRO } from './user.interface';
import { LoginUserDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) { }

    async getUsers(query): Promise<UserEntity[]> {

        const db = getRepository(UserEntity)
            .createQueryBuilder("u");
        if (query.search)
            db.where("u.email like :name or u.displayName like :name", { name: '%' + query.search + '%' })

        return db.getMany();
    }

    async getUser(_id: number): Promise<UserEntity> {
        return this.usersRepository.findOne({
            select: ['id', 'email', 'displayName', 'typeOfNoer', 'imageUrl', 'city'],
            where: [{ id: _id }]
        });
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
            select: ['id', 'email', 'displayName', 'typeOfNoer', 'imageUrl', 'city'],
            where: _where,
            relations: ["city"]
        });
    }

    async updateUser(user: LoginUserDto | CreateUserDto) {
        return this.usersRepository.save(user);
    }

    async deleteUser(user: UserEntity) {
        this.usersRepository.delete(user);
    }
    async findById(id: number): Promise<any> {
        const user = await this.usersRepository.findOne({
            select: ['id', 'email', 'displayName', 'role', 'typeOfNoer', 'imageUrl'],
            where: [{ id: id }]
        });

        if (!user) {
            const errors = { User: ' not found' };
            throw new HttpException({ errors }, 401);
        }

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
}