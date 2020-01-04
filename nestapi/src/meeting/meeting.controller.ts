import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Request, UsePipes } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { ValidationPipe } from './../shared/pipes/validation.pipe';
@Controller('meeting')
export class MeetingController {

  constructor(public meetingService: MeetingService) { }

  @Get()
  async getMeetings() {
    const data: any = await this.meetingService.getMeetings();
    return { message: 'ok', data };
  }
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, image, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(image.originalname)}`)
      }
    })
  }))
  @Post()
  async createMeeting(@UploadedFile() image, @Body() meetingDto: CreateMeetingDto, @Request() req) {
    meetingDto.imageUrl = image.path;
    console.log('meetingDto', meetingDto);
    const data = await this.meetingService.createMeeting(meetingDto);
    return { message: 'ok', data };
  }
}
