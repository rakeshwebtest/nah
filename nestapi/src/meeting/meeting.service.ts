import { Injectable } from '@nestjs/common';
import { MeetingEntity } from './meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getConnection } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UserEntity } from 'src/user/user.entity';
import { GroupEntity } from 'src/group/group.entity';
import { MeetingMembersEntity } from './meeting-members.entity';
import { SERVERBASEPATH } from 'src/config';
import { CityEntity } from 'src/city/city.entity';
import { MeetingCommentsEntity } from './meeting-comments.entity';
import { CommentDto } from './dto/comment.dto';
import { MeetingPhotosEntity } from './meeting-photos.entity';
import { MeetingVideosEntity } from './meeting-videos.entity';
import { VideoDto } from './dto/video.dto';
import { ReportDto } from './dto/report.dto';
import { MeetingReportEntity } from './meeting-report.entity';
import { CommentReplyDto } from './dto/comment-reply.dto';
import { MeetingCommentReplyEntity } from './meeting-comment-reply.entity';

@Injectable()
export class MeetingService {
    constructor(@InjectRepository(MeetingEntity) private readonly meetingRepository: Repository<MeetingEntity>,
        @InjectRepository(MeetingCommentsEntity) private readonly meetingCommentRepository: Repository<MeetingCommentsEntity>,
        @InjectRepository(MeetingReportEntity) private readonly meetingReportRepository: Repository<MeetingReportEntity>,
        @InjectRepository(MeetingPhotosEntity) private readonly meetingPhotosRepository: Repository<MeetingPhotosEntity>,
        @InjectRepository(MeetingVideosEntity) private readonly meetingVideoRepository: Repository<MeetingVideosEntity>,
        @InjectRepository(MeetingMembersEntity) private readonly meetingMembersRepository: Repository<MeetingEntity>,
        @InjectRepository(MeetingCommentReplyEntity) private readonly meetingCommentReplyRepository: Repository<MeetingCommentReplyEntity>,
        ) {

    }

    async getMeetings(query: any,sessionUser): Promise<MeetingEntity | MeetingEntity[]> {
        const db = getRepository(MeetingEntity)
            .createQueryBuilder('m')
            .select(["m", "group", "u.id", "u.displayName", "u.imageUrl", "mm", "mp",
                "user.id", "user.displayName", "user.imageUrl", "city",
                "mc","mv","mcr","mcr_createdBy", "mc_createdBy.id", "mc_createdBy.imageUrl", "mc_createdBy.displayName"])
            .leftJoin('m.createdBy', 'u')
            .leftJoin('m.city', 'city')
            .leftJoin('m.group', 'group')
            .leftJoin('group.followers', 'gf')
            .leftJoin('gf.user', 'gf_user')
            .leftJoin("m.members", 'mm')
            .leftJoin("m.comments", 'mc')
            .leftJoin("mc.createdBy", 'mc_createdBy')
            .leftJoin("mc.replys", 'mcr')
            .leftJoin("mcr.createdBy", 'mcr_createdBy')
            .leftJoin("m.photos", 'mp')
            .leftJoin("m.videos", 'mv')
            .leftJoin("mm.user", 'user')
            .orderBy({ "m.createdDate": "DESC", "mc.createdDate": "DESC" })
            .andWhere('group.isDeleted != 1')
            .andWhere('m.isDeleted != 1');
        if(sessionUser.role === 'admin'){

        }else{
            if (query.groupId) {
                db.andWhere('group.id= :id', { id: query.groupId });
            } else {
                db.andWhere('(gf_user.id= :id OR group.createdBy= :id)', { id: query.userId });
            }
    
            if (query.type && query.type === 'upcoming') {
                db.andWhere('m.meetingDate >= DATE(NOW())');
            }
    
            if (query.type && query.type === 'my-meeting') {
                db.andWhere('u.id = :id', { id: sessionUser.id })
            } else {
                db.andWhere('m.isPublished = 1');
            }
        }

        // get one meeting details   
        if (query.meetingId) { // single meeting
            db.where('m.id = :meetingId', { meetingId: query.meetingId });
            const data: any = await db.getOne();
            // data.imageUrl = SERVERBASEPATH + data.imageUrl;
            return this.bindFileBasePath(data);
        } else {
            const data = await db.getMany(); // all meeting
            if (data) {
                data.map(meeting => {
                    return this.bindFileBasePath(meeting);
                });
            }
            return data;
        }
        // return  this.meetingRepository.find({relations:["user","members"]});

    }
    bindFileBasePath(meeting) {
        if (meeting) {
            if (meeting.imageUrl)
                meeting.imageUrl = SERVERBASEPATH + meeting.imageUrl;
            if (meeting.photos) {
                meeting.photos.map(p => {
                    if (p.imagePath)
                        p.imagePath = SERVERBASEPATH + p.imagePath;
                });
            }

        }
        return meeting;
    }
    /**
     * createing meeting
     */
    async createMeeting(meeting: CreateMeetingDto): Promise<MeetingEntity> {
        const _meeting = new MeetingEntity();
        _meeting.title = meeting.title;
        _meeting.agenda = meeting.agenda;
        _meeting.meetingDate = meeting.meetingDate;
        _meeting.endDate = meeting.endDate;
        _meeting.startTime = meeting.startTime;
        _meeting.endTime = meeting.endTime;
        _meeting.imageUrl = meeting.imageUrl;
        _meeting.location = meeting.location;
        _meeting.contactInfo = meeting.contactInfo;
        _meeting.isPublished = parseInt(meeting.isPublished);

        const userId = parseInt(meeting.createdBy);
        const groupId = parseInt(meeting.groupId);
        // user 
        _meeting.createdBy = new UserEntity();
        _meeting.createdBy.id = userId;

        // group
        _meeting.group = new GroupEntity();
        _meeting.group.id = groupId;

        // city
        _meeting.city = new CityEntity();
        _meeting.city.id = parseInt(meeting.cityId);

        return this.meetingRepository.save(_meeting);
        // return data;

    }
    /**
     * join or unjoin meeting members 
     */
    async joinMember(meetingMemberDto: any) {
        const meetingMember = new MeetingMembersEntity();
        meetingMember.meeting = new MeetingEntity();
        meetingMember.meeting.id = meetingMemberDto.meetingId;
        meetingMember.user = new UserEntity();
        meetingMember.user.id = meetingMemberDto.userId;


        const isMember = await this.meetingMembersRepository.findOne(meetingMember);
        if (isMember) {
            await this.meetingMembersRepository.delete(isMember);
            return { message: 'Successfully Un-join Member', isMember };
        } else {
            const data = await this.meetingMembersRepository.save(meetingMember);
            return { message: 'Successfully Join Member', data };
        }
    }
    async addComment(commentDto: CommentDto) {
        const comment = new MeetingCommentsEntity();
        comment.createdBy = new UserEntity();
        comment.meeting = new MeetingEntity();
        comment.meeting.id = commentDto.meetingId;
        comment.createdBy.id = commentDto.userId;
        comment.comment = commentDto.comment;
        const data = await this.meetingCommentRepository.save(comment);
        return { message: 'Add Comment Successfully', data };
    }
    async addCommentReply(commentDto: CommentReplyDto) {
        const comment = new MeetingCommentReplyEntity();
        comment.createdBy = new UserEntity();
        comment.meetingComment = new MeetingCommentsEntity();
        comment.meetingComment.id = commentDto.meetingCommentId;
        comment.createdBy.id = commentDto.userId;
        comment.comment = commentDto.comment;
        const data = await this.meetingCommentReplyRepository.save(comment);
        return { message: 'Add Comment Successfully', data };
    }
    async addVideo(videoDto: VideoDto) {
        const video = new MeetingVideosEntity();
        video.meeting = new MeetingEntity();
        video.meeting.id = videoDto.meetingId;
        video.videoPath = videoDto.videoPath;
        const data = await this.meetingVideoRepository.save(video);
        return { message: 'Add Video Successfully', data };
    }
    async uploadMeetingImages(images: any[], meetingId) {
        // const photos:MeetingPhotosEntity
        const imagesList: any[] = images.map(img => {
            const meeting = new MeetingEntity();
            meeting.id = meetingId;

            return { imagePath: img.path, meeting: meeting };
        });

        const data = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(MeetingPhotosEntity)
            .values(imagesList)
            .execute();
        imagesList.map(meeting => {
            if (meeting.imagePath)
                meeting.imagePath = SERVERBASEPATH + meeting.imagePath;
        });
        return imagesList;

    }
    async meetingPublished(meetingId) {
        const meeting = new MeetingEntity();
        meeting.isPublished = 1;
        const data = await this.meetingRepository.update(meetingId, meeting);
        return { message: 'Meeting Published Successfully', data };
    }
    async addReport(reportDto: ReportDto) {
        const report = new MeetingReportEntity();
        report.createdBy = new UserEntity();
        report.meeting = new MeetingEntity();
        report.meeting.id = reportDto.meetingId;
        report.createdBy.id = reportDto.userId;
        report.comment = reportDto.comment;
        const data = await this.meetingReportRepository.save(report);
        return { message: 'Report submit Successfully', data };
    }
    async deleteMeeting(meetingId) {
        const meeting = new MeetingEntity();
        meeting.isDeleted = 1;
        return await this.meetingRepository.update(meetingId, meeting);
    }

} 
