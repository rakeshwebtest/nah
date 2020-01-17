import { Controller, Get, UsePipes, Post, Body, HttpException, HttpStatus, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { GroupService } from './group.service';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupFollowDto } from './dto/group-follow.dto';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Group')
@Controller('group')
export class GroupController {
    constructor(public service: GroupService) { }

    @Get('list')
    async getGroups(@Query() query, @Req() req) {
        const data: any = await this.service.getGroups(query);
        // urse:req.sessionUser
        return { message: false, ...data };
    }
    @Get('list/:id')
    async getGroupById(@Param() params: any) {

        const data: any = await this.service.getGroupById(params.id);
        return { message: false, data };
    }
    @UsePipes(new ValidationPipe())
    @Post()
    async createGroup(@Body() group: CreateGroupDto) {
        //check groupname exist or not
        const isGroup = await this.service.checkGroupName(group);
        if (isGroup) {
            throw new HttpException({ message: 'Already group name created', errors: 'Already group exists' }, HttpStatus.BAD_REQUEST);
        } else {
            const data: any = await this.service.updateGroup(group);
            return { message: 'Successfully Create A Group', data };
        }
    }

    @UsePipes(new ValidationPipe())
    @Post('follow')
    async follower(@Body() followMember: GroupFollowDto) {
        return this.service.follow(followMember);
        // const isFollower = await this.service.isFollower(followMember);
        // if (isFollower) {
        //     const data: any = await this.service.unFollow(isFollower.id);
        //     if (data) {
        //         const group: any = await this.service.getGroupById(followMember.groupId);
        //         group.followersCount = group.followersCount - 1;
        //         this.service.updateGroup(group);
        //     }
        //     return { message: 'successfully Un Followed Group', data };
        //     // throw new HttpException({ message: 'Already followed group', errors: 'Already followed group' }, HttpStatus.BAD_REQUEST);
        // } else {
        //     const data: any = await this.service.follow(followMember);
        //     if (data) {
        //         const group: any = await this.service.getGroupById(followMember.groupId);
        //         group.followersCount = group.followersCount + 1;
        //         this.service.updateGroup(group);
        //     }
        //     return { message: 'successfully Followed Group', data };
        // }

    }
    @Delete(':id')
    async deleteGruop(@Param() params: any) {
        const data = await this.service.deleteGroup(params.id);
        return { message: 'Group Delete Successfullly', data };
    }

}
