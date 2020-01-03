import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Request } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from  'path';

@Controller('meeting')
export class MeetingController {

    constructor(public meetingService: MeetingService) { }

    @Get()
    async getMeetings() {
        const data: any = await this.meetingService.getGroups();
        return { message: 'ok', data };
    }
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
        })
      }))
    @Post()
    async createMeeting(@UploadedFile() file, @Body() body, @Request() req) {

        console.log('`${this.SERVER_URL}${file.path}`',`${file.path}`);
        console.log('titel');
        return { message: 'ok', body };
    }
}
