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

@Controller('user')
export class UsersController {

    constructor(public service: UserService) { }

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
    @UsePipes(new ValidationPipe())
    @Put()
    update(@Body() user: CreateUserDto) {
        return this.service.updateUser(user);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}