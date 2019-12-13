import { Controller, Get, UsePipes, Post, Body } from '@nestjs/common';
import { GroupService } from './group.service';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('group')
export class GroupController {
    constructor(public service: GroupService) { }

    @Get('list')
    async getUser() {
        const data: any = await this.service.getGroups();
        return { message: 'Fetch Groups', data };
    }

    @UsePipes(new ValidationPipe())
    @Post()
    async update(@Body() group: CreateGroupDto) {
        const data: any = await this.service.updateGroup(group);
        return { message: 'Fetch Groups', data };
    }

}
