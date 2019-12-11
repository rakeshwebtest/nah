import { Controller, Get } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(public service: GroupService) { }

    @Get()
    async getUser() {
        const data: any = await this.service.getGroups();
        return { message: 'Fetch Groups', data };
    }

}
