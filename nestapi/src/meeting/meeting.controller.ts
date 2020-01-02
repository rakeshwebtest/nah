import { Controller, Get } from '@nestjs/common';
import { MeetingService } from './meeting.service';

@Controller('meeting')
export class MeetingController {

    constructor( public meetingService: MeetingService) { }

    @Get()
    async getMeetings() {
        const data: any = await this.meetingService.getGroups();
        return { message: 'ok', data };
    }
}
