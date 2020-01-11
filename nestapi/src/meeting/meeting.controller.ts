import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Request, UsePipes, Param, Query } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { ValidationPipe } from './../shared/pipes/validation.pipe';
import { JoinMeetingDto } from './dto/join-member.dto';
@Controller('meeting')
export class MeetingController {

  constructor(public meetingService: MeetingService) { }
  /**
   * get all meeting with meembers
   */

  @Get('list')
  async getMeetings(@Query() query) {
    const data: any = await this.meetingService.getMeetings(query);

    return { message: 'ok', data, query };
  }
  /**
 * get all meeting with meembers
 * :type upcomeing , coming ,createdId 
 */

  @Get('list/:type/:id')
  async getMeetingsByType(@Query() query) {
    const data: any = await this.meetingService.getMeetings(query);
    return { message: 'ok', data };
  }
  /**
   * create meeting or update meeting
   * @param image 
   * @param meetingDto 
   * @param req 
   */
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

  /**
   * join or unjoin meeting members
   */
  @UsePipes(new ValidationPipe())
  @Post('join')
  async joinOrUnjoin(@Body() meetingMebers: JoinMeetingDto, @Request() req) {
    return this.meetingService.joinMember(meetingMebers);
  }
}
