import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import {
    ApiBearerAuth,
    ApiResponse,
    ApiOperation,
} from '@nestjs/swagger';
import { LoginUserDto } from './dto';

@Controller('user')
export class UsersController {

    constructor(private service: UserService) { }

    @Get()
    async getUser() {
        const data: any = await this.service.getUsers();
        return { message: 'ok', data: data };
    }

    @Get(':id')
    get(@Param() params) {
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

    @Post('login')
    async create(@Body() user: LoginUserDto) {
        // check user
        const _user: UserEntity[] = await this.service.checkUser(user.email);
        if (_user.length > 0) {
            user.id = _user[0].id;
        }
        const data = await this.service.updateUser(user);
        const token = await this.service.generateJWT(data);
        return { message: 'Login Succussfully', data: { user, token } };
    }

    @Put()
    update(@Body() user: UserEntity) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}