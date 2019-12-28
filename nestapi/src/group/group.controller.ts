import { Controller, Get, UsePipes, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { GroupService } from './group.service';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupFollowDto } from './dto/group-follow.dto';

@Controller('group')
export class GroupController {
    constructor(public service: GroupService) { }

    @Get('list')
    async getGroups() {
        const data: any = await this.service.getGroups();
        return { message: 'Fetch Groups', data };
    }
    @UsePipes(new ValidationPipe())
    @Post()
    async createGroup(@Body() group: CreateGroupDto) {
        //check groupname exist or not
        const isGroup = await this.service.checkGroupName(group);
        if (isGroup) {
            throw new HttpException({ message: 'Already group exists', errors: 'Already group exists' }, HttpStatus.BAD_REQUEST);
        } else {
            const data: any = await this.service.updateGroup(group);
            return { message: 'Successfully updated Group', data };
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

}
