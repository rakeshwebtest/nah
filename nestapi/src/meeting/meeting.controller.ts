import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Request, UsePipes, Param, Query, UploadedFiles, Delete } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateMeetingDto, MeetingQueryDao, GetReportDto } from './dto/create-meeting.dto';
import { ValidationPipe } from './../shared/pipes/validation.pipe';
import { JoinMeetingDto } from './dto/join-member.dto';
import { ApiBearerAuth, ApiTags, ApiProperty, ApiConsumes } from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';
import { VideoDto } from './dto/video.dto';
import * as path from 'path';
import { ReportDto } from './dto/report.dto';
import { CommentReplyDto } from './dto/comment-reply.dto';

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
  async getMeetings(@Query() query: MeetingQueryDao, @Request() req) {
    const sessionUser = req['sessionUser'];
    let data: any;
    if (query.meetingId) {
      data = await this.meetingService.getMeetings(query, sessionUser);
      return { message: false, data, success: true };
    } else {
      data = await this.meetingService.getMeetings(query, sessionUser);
      return { message: false, success: true, ...data, query };
    }
  }

  /**
   * create meeting or update meeting
   * @param image
   * @param meetingDto
   * @param req
   */
  @ApiConsumes('multipart/form-data')
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
    let msg = 'Meeting created successfully';
    if (meetingDto.id) {
      msg = 'Meeting updated successfully';
    }
    console.log('meetingDto.isPublished -->', meetingDto.isPublished);
    if(!meetingDto.isPublished || meetingDto.isPublished == 0 || meetingDto.isPublished == '0' || meetingDto.isPublished === 0) {
      msg = "Meeting draft saved successfully";
    }
    const data = await this.meetingService.createMeeting(meetingDto, image);

    return { message: msg, success: true, data };
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
   * @param id 
   */
  @Delete('comment/:commentId')
  async deleteComment(@Param('commentId') id: number) {
    const data = await this.meetingService.deleteComment(id);
    return { message: 'Deleted successfull', success: true, data };
  }

  /**
   *
   * @param id
   */
  @Delete('comment/reply/:replyCommentId')
  async deleteReplyComment(@Param('replyCommentId') replyCommentId: number) {
    const data = await this.meetingService.deleteComment(null, replyCommentId);
    return { message: 'Deleted successfull', success: true, data };
  }

  @UsePipes(new ValidationPipe())
  @Post('comment-reply')
  async addCommentReplay(@Body() commentReply: CommentReplyDto, @Request() req) {
    return this.meetingService.addCommentReply(commentReply);
  }

  /**
   * 
   * @param video 
   * @param req 
   */
  @UsePipes(new ValidationPipe())
  @Post('video')
  async addVideos(@Body() video: VideoDto, @Request() req) {
    const sessionUser = req['sessionUser'];
    return this.meetingService.addVideo(video,sessionUser);
  }

  /**
   * 
   * @param params 
   */
  @UsePipes(new ValidationPipe())
  @Delete('video/:videoId')
  async deleteVideo(@Param('videoId') videoId: number) {
    const data = await this.meetingService.deleteVideo(videoId);
    return { message: 'Deleted successfully', success: true, data };
  }

  /**
 * 
 * @param params
 */
  @UsePipes(new ValidationPipe())
  @Delete('photo/:photoId')
  async deletePhoto(@Param('photoId') photoId: number) {
    const data = await this.meetingService.deletePhoto(photoId);
    return { message: 'Image deleted successfully', success: true, data };
  }

  @Get('publish/:meetingId')
  async meetingPublished(@Param() params: any) {
    const data = await this.meetingService.meetingPublishedOrCanceled(params.meetingId, 'publish');
    return { message: 'Published Successfully', success: true, data };

  }
  @Get('cancel/:meetingId')
  async meetingCanceled(@Param() params: any) {
    const data = await this.meetingService.meetingPublishedOrCanceled(params.meetingId, 'cancel');
    return { message: 'Canceled Successfully', success: true, data };
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
  async meetingImages(@UploadedFiles() images, @Body() fileDto: any, @Param() params: any, @Request() req) {
    const sessionUser = req['sessionUser'];
    const data = await this.meetingService.uploadMeetingImages(images, params.meetingId,sessionUser);
    let succMsg = 'Image added successfully';
    if(images.length > 1 ) {
      succMsg = 'Images added successfully';
    }
    console.log('images -->', images.length); 

    return { message: succMsg, success: true, data };

  }
  /**
* 
* @param report 
* @param req 
*/
  @Get('report')
  async getReports(@Request() req, @Query() query: GetReportDto) {
    const data = await this.meetingService.getReports(query);
    return { message: false, success: true, data };
  }

  /**
 * 
 * @param report 
 * @param req 
 */
  @UsePipes(new ValidationPipe())
  @Post('report')
  async addReport(@Body() report: ReportDto, @Request() req) {
    const data = await this.meetingService.addReport(report);
    return { message: 'Report Submit Successfully', success: true, data };
  }

  @Get('report/category')
  async getReportCategory(@Request() req) {
    const [result, total] = await this.meetingService.getReportCategoryList();
    return { message: false, success: true, data: result, count: total };
  }

  @Get('report/category/info')
  async getReportCategoryInfo(@Request() req) {
    const data = await this.meetingService.getReportCategoryInfo();
    return { message: false, success: true, data: data };
  }

  @Delete(':meetingId')
  async deleteGruop(@Param() params: any) {
    const data = await this.meetingService.deleteMeeting(params.meetingId);
    return { message: 'Deleted successfully', success: true, data };
  }
}
