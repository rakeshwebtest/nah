import { Controller, Post, Body, Get, Put, Delete, Param, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import {
    ApiBearerAuth,
    ApiResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { LoginUserDto } from './dto';
import { ValidationPipe } from './../shared/pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { GroupService } from 'src/group/group.service';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';

@Controller('user')
export class UsersController {

    constructor(public service: UserService, public groupService: GroupService) { }

    @Get()
    async getUser() {
        const data: any = await this.service.getUsers();
        return { message: 'ok', data };
    }

    @Get(':id')
    get(@Param() params) {
        console.log('@Param()', params);
        return this.service.getUser(params.id);
    }

    // @Post('users/login')
    // async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    //     const _user = await this.userService.findOne(loginUserDto);

    //     const errors = { User: ' not found' };
    //     if (!_user) throw new HttpException({ errors }, 401);

    //     const token = await this.userService.generateJWT(_user);
    //     const { email, username, bio, image } = _user;
    //     const user = { email, token, username, bio, image };
    //     return { user }
    // }
    @UsePipes(new ValidationPipe())
    @Post('login')
    async create(@Body() user: LoginUserDto) {
        // check user
        const _user: UserEntity = await this.service.checkUser(user.email);
        if (_user) {
            user.id = _user.id;
            user.updatedDate = new Date();
        }

        const data = await this.service.updateUser(user);
        const token = await this.service.generateJWT(data);
        return { message: 'Login Succussfully', data: { user:_user || user, token } };
    }
    @UsePipes(new ValidationPipe())
    @Put()
   async update(@Body() user: CreateUserDto) {
        // create group if newGroupName there
        if (user.newGroupName) {
            const group: CreateGroupDto = {
                name: user.newGroupName,
                createdBy: user.id
            }
            this.groupService.updateGroup(group);
        }
        if(user.followGroups){
            for (let index = 0; index < user.followGroups.length; index++) {
                const follow = user.followGroups[index];
                await this.groupService.follow(follow);
            }
            // this.groupService.updateFollowGroup(user.followGroups);
        }

        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}