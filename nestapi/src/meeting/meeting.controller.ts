import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Request, UsePipes, Param, Query, UploadedFiles, Delete } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { ValidationPipe } from './../shared/pipes/validation.pipe';
import { JoinMeetingDto } from './dto/join-member.dto';
import { ApiBearerAuth, ApiTags, ApiProperty } from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';
import { VideoDto } from './dto/video.dto';
import * as path from 'path';
import { ReportDto } from './dto/report.dto';

const imageFilter = (req, file, callback) => {
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
  async getMeetings(@Query() query, @Request() req) {
    const data: any = await this.meetingService.getMeetings(query);
    const sessionUser = req['sessionUser'];
    return { message: false, data, query, sessionUser };
  }

  /**
 * get all meeting with meembers
 * :type upcomeing , coming ,createdId 
 */

  // @Get('list/:type/:id')
  // async getMeetingsByType(@Query() query) {
  //   const data: any = await this.meetingService.getMeetings(query);
  //   return { message: false, data };
  // }
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
   * 
   * @param comment 
   * @param req 
   */
  @UsePipes(new ValidationPipe())
  @Post('comment')
  async addComment(@Body() comment: CommentDto, @Request() req) {
    return this.meetingService.addComment(comment);
  }

  /**
   * 
   * @param video 
   * @param req 
   */
  @UsePipes(new ValidationPipe())
  @Post('video')
  async addVideos(@Body() video: VideoDto, @Request() req) {
    return this.meetingService.addVideo(video);
  }

  @Get('publish/:meetingId')
  async meetingPublished(@Param() params: any) {
    return this.meetingService.meetingPublished(params.meetingId);
  }
  /**
   * 
   * @param images 
   * @param fileDto 
   * @param params 
   */

  @Post('images/:meetingId')
  @UseInterceptors(FilesInterceptor('images[]', 20, {
    fileFilter: imageFilter,
    storage: diskStorage({
      destination: './uploads',
      filename: (req, image, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(image.originalname)}`)
      }
    })
  }))
  async meetingImages(@UploadedFiles() images, @Body() fileDto: any, @Param() params: any) {

    const data = await this.meetingService.uploadMeetingImages(images, params.meetingId);

    return { message: "Successfull Upload image", data };

  }

  /**
 * 
 * @param report 
 * @param req 
 */
  @UsePipes(new ValidationPipe())
  @Post('report')
  async addReport(@Body() report: ReportDto, @Request() req) {
    return this.meetingService.addReport(report);
  }
  @Delete(':meetingId')
  async deleteGruop(@Param() params: any) {
    const data = await this.meetingService.deleteMeeting(params.meetingId);
    return { message: 'Meeting Delete Successfullly', data };
  }


}
