import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Request, UsePipes, Param, Query, UploadedFiles } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { ValidationPipe } from './../shared/pipes/validation.pipe';
import { JoinMeetingDto } from './dto/join-member.dto';
import { ApiBearerAuth, ApiTags, ApiProperty } from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';
import * as path from 'path';

const imageFilter = (req, file, callback) => {
    console.log('file',file);
  let ext = path.extname(file.originalname);

  if (ext === '.png' || ext === '.jpeg' || ext === '.jpg') {
    return callback(null, true);
  } else {
    req.fileValidationError = 'Invalid file type';
    return callback(new Error('Invalid file type'), false);
  }
}


@ApiBearerAuth()
@ApiTags('Meeting')
@Controller('meeting')
export class MeetingController {

  constructor(public meetingService: MeetingService) { }
  /**
   * get all meeting with meembers
   */

  @Get('list')
  async getMeetings(@Query() query) {
    const data: any = await this.meetingService.getMeetings(query);

    return { message: false, data, query };
  }

  /**
 * get all meeting with meembers
 * :type upcomeing , coming ,createdId 
 */

  @Get('list/:type/:id')
  async getMeetingsByType(@Query() query) {
    const data: any = await this.meetingService.getMeetings(query);
    return { message: false, data };
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
    return { message: 'Successfully Create A Meeting', data };
  }

  /**
   * join or unjoin meeting members
   */
  @UsePipes(new ValidationPipe())
  @Post('join')
  async joinOrUnjoin(@Body() meetingMebers: JoinMeetingDto, @Request() req) {
    return this.meetingService.joinMember(meetingMebers);
  }

  /**
   * join or unjoin meeting members
   */
  @UsePipes(new ValidationPipe())
  @Post('comment')
  async addComment(@Body() comment: CommentDto, @Request() req) {
    return this.meetingService.addComment(comment);
  }

  @Post('images')
  // @UseInterceptors(FilesInterceptor('images[]', 20, {
  //   fileFilter: imageFilter
  // }))
  @UseInterceptors(FilesInterceptor('images[]', 20,{
    fileFilter: imageFilter,
    storage: diskStorage({
      destination: './uploads',
      filename: (req, image, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(image.originalname)}`)
      }
    })
  }))
  meetingImages(@UploadedFiles() images, @Body() fileDto: any) {

    console.log(images);
    console.log(fileDto);

    return {images,fileDto};

  }


}
