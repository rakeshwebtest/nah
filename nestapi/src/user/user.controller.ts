import { Controller, Post, Body, Get, Put, Delete, Param, UsePipes, Request, Req, Query, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import {
    ApiBearerAuth,
    ApiResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';
import { LoginUserDto } from './dto';
import { ValidationPipe } from './../shared/pipes/validation.pipe';
import { CreateUserDto, UserLIstQuery, ChangePassword } from './dto/create-user.dto';
import { GroupService } from 'src/group/group.service';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { CityEntity } from 'src/city/city.entity';
import { FollowDto, ProfileBlockDto } from './dto/login-user.dto';
import { AppMailerService } from 'src/app-mailer/app-mailer.service';

@ApiTags('Users')
@Controller('user')
export class UsersController {

    constructor(public service: UserService, public groupService: GroupService, public appMailerService: AppMailerService) { }
    @ApiBearerAuth()
    @Get('list')
    async getUser(@Request() req, @Query() query: UserLIstQuery) {
        const data: any = await this.service.getUsers(query);
        const userInfo = req['sessionUser'];
        return { message: false, success: true, data };
    }
    @ApiBearerAuth()
    @Post()
    async updateUser(@Body() user: CreateUserDto) {
        const data: any = await this.service.updateUser(user);
        const userInfo: any = await this.service.getUser(data.id);
        return { message: false, data: userInfo };
    }
    @ApiBearerAuth()
    @UsePipes(new ValidationPipe())
    @Put('changePassword')
    async updatePasswordUser(@Body() user: ChangePassword, @Request() req) {
        const sessionUser: any = req['sessionUser'];
        const data: any = await this.service.changePassword(sessionUser, user.password);
        return { message: 'Updated Successfully', success: true, data };
    }

    @ApiBearerAuth()
    @Get('block/:userId')
    async blockUser(@Request() req, @Param('userId') id: number) {
        const sessionUser: any = req['sessionUser'];
        if (sessionUser.role === 'admin') {
            const userInfo: any = await this.service.getUser(id);
            userInfo.status = 'block';
            const data: any = await this.service.updateUser(userInfo);
            return { message: 'Successfully Blocked User', success: true, data };
        } else {
            return { message: 'Permission denied', success: false };
        }

    }

    @ApiBearerAuth()
    @Get('unblock/:userId')
    async unblockUser(@Request() req, @Param('userId') id: number) {
        const sessionUser: any = req['sessionUser'];
        if (sessionUser.role === 'admin') {
            const userInfo: any = await this.service.getUser(id);
            userInfo.status = 'active';
            const data: any = await this.service.updateUser(userInfo);
            return { message: 'Actived User Successfully', success: true, data };
        } else {
            return { message: 'Permission denied', success: false };
        }

    }

    @ApiBearerAuth()
    @Get(':userId')
    async get(@Param('userId') id: number, @Request() req) {
        const sessionUser: any = req['sessionUser'];
        const data: any = await this.service.getUser(id, sessionUser);
        return { message: false, data, success: true };
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
        let _user: UserEntity;
        let token: string;
        if (user.provider === 'login') {
            _user = await this.service.checkUser(user.email, user.password);
            if (!_user) {
                throw new HttpException({ message: 'Invalid Login details', success: false }, HttpStatus.OK);
            } else {
                if (_user.status === 'block')
                    throw new HttpException({ message: 'Blocked User', success: false }, HttpStatus.FORBIDDEN);

            }
        } else {
            _user = await this.service.checkUser(user.email);
            if (_user && _user.id) {
                if (_user.status === 'block')
                    throw new HttpException({ message: 'Blocked User', success: false }, HttpStatus.FORBIDDEN);

                user.id = _user.id;
                user.updatedDate = new Date();
            } else {
                _user = <any>user;
                this.appMailerService.send(user.email, 'welcome', _user);
            }
            if (user.fcmToken) {
                _user.fcmToken = user.fcmToken;
            }
            if(user.provider){
                _user.provider = user.provider;
            }

            _user = await this.service.updateUser(_user);
        }

        token = await this.service.generateJWT(_user);

        return { message: false, success: true, data: { user: _user || user, token } };
    }

    @Post('follow')
    async follow(@Body() follower: FollowDto, @Req() req) {
        const sessionUser = req.sessionUser;
        const data = await this.service.follow(sessionUser.id, follower.followingId);
        return { message: 'Followed successfully', success: true, data };
    }

    @Post('unfollow')
    async unfollow(@Body() follower: FollowDto, @Req() req) {
        const sessionUser = req.sessionUser;
        const data: any = await this.service.unfollow(sessionUser.id, follower.followingId);
        return { message: 'Unfollowed successfully', success: true, data };
    }

    @Post('profileBlock')
    async profileBlock(@Body() profileUser: ProfileBlockDto, @Req() req) {
        const sessionUser = req.sessionUser;
        const unfollow: any = await this.service.unfollow(sessionUser.id, profileUser.userId);
        const data = await this.service.profileBlock(sessionUser.id, profileUser.userId);
        return { message: 'User blocked successfully', success: true, data };
    }

    @Post('profileUnblock')
    async profileUnblock(@Body() profileUser: ProfileBlockDto, @Req() req) {
        const sessionUser = req.sessionUser;
        const data: any = await this.service.profileUnblock(sessionUser.id, profileUser.userId);
        return { message: 'User unblocked successfully', success: true, data };
    }

    @ApiBearerAuth()
    @UsePipes(new ValidationPipe())
    @Put()
    async update(@Body() user: CreateUserDto, @Req() req) {
        // create group if newGroupName there
        const sessionUser = req.sessionUser;
        if (user.newGroupName) {
            const group: CreateGroupDto = {
                name: user.newGroupName
            };
            this.groupService.updateGroup(group, sessionUser);
        }
        if (user.followGroups) {
            for (let index = 0; index < user.followGroups.length; index++) {
                const follow = user.followGroups[index];
                await this.groupService.follow(follow);
            }
            // this.groupService.updateFollowGroup(user.followGroups);
        }
        const _userEntity = new UserEntity();
        if (user.city) {
            _userEntity.city = new CityEntity();
            _userEntity.city = user.city;
        }
        _userEntity.typeOfNoer = user.typeOfNoer;
        _userEntity.email = user.email;
        _userEntity.id = user.id;
        const data = await this.service.updateUser(_userEntity);
        const userInfo: any = await this.service.getUser(data.id);
        return { message: 'Profile updated successfully', data: userInfo };
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}