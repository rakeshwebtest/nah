import { Controller, Post, Body, Get, Put, Delete, Param, UsePipes, Request, Req } from '@nestjs/common';
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
import { CreateUserDto } from './dto/create-user.dto';
import { GroupService } from 'src/group/group.service';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { CityEntity } from 'src/city/city.entity';

@ApiTags('Users')
@Controller('user')
export class UsersController {

    constructor(public service: UserService, public groupService: GroupService) { }
    @ApiBearerAuth()
    @Get('list')
    async getUser(@Request() req) {
        const data: any = await this.service.getUsers();
        const userInfo = req['sessionUser'];
        return { message: 'ok', data, userInfo };
    }
    @ApiBearerAuth()
    @Post()
    async updateUser(@Body() user: CreateUserDto) {
        const data: any = await this.service.updateUser(user);
        return { message: 'ok', data };
    }

    @ApiBearerAuth()
    @Get(':userId')
    async get(@Param('userId') id:number) {
        const data:any = await this.service.getUser(id);
        return { message: 'ok', data };
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
        return { message: false, data: { user: _user || user, token } };
    }

    @ApiBearerAuth()
    @UsePipes(new ValidationPipe())
    @Put()
    async update(@Body() user: CreateUserDto,@Req() req) {
        // create group if newGroupName there
        const sessionUser = req.sessionUser;
        if (user.newGroupName) {
            const group: CreateGroupDto = {
                name: user.newGroupName
            };
            this.groupService.updateGroup(group,sessionUser);
        }
        if (user.followGroups) {
            for (let index = 0; index < user.followGroups.length; index++) {
                const follow = user.followGroups[index];
                await this.groupService.follow(follow);
            }
            // this.groupService.updateFollowGroup(user.followGroups);
        }
        const _userEntity = new UserEntity();
        if (user.cityId) {
            _userEntity.city = new CityEntity();
            _userEntity.city.id = user.cityId;
        }
        _userEntity.typeOfNoer = user.typeOfNoer;
        _userEntity.email = user.email;
        _userEntity.id = user.id;
        const data = await this.service.updateUser(_userEntity);
        return { message: 'Update Succussfully', data };
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}