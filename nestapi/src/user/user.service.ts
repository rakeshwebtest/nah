import { Injectable, Inject, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { SECRET } from '../config';
const jwt = require('jsonwebtoken');
import { UserRO } from './user.interface';
import { LoginUserDto } from './dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) { }

    async getUsers(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    async getUser(_id: number): Promise<UserEntity[]> {
        return this.usersRepository.find({
            select: ['displayName'],
            where: [{ id: _id }]
        });
    }
    async checkUser(_email: string): Promise<UserEntity> {
        // select: ['id', 'displayName','typeOfNeor'],
        return this.usersRepository.findOne({
            select: ['id', 'email', 'displayName', 'typeOfNoer', 'imageUrl', 'city'],
            where: [{ email: _email }],
            relations: ["city"]
        });
    }

    async updateUser(user: LoginUserDto) {
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