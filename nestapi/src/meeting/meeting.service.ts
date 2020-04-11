import { Injectable } from '@nestjs/common';
import { MeetingEntity } from './meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getConnection } from 'typeorm';
import { CreateMeetingDto, MeetingQueryDao } from './dto/create-meeting.dto';
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
import { MeetingReportCateogryEntity } from './meeting-report-category.entity';
import { isNull } from 'util';

@Injectable()
export class MeetingService {
    constructor(@InjectRepository(MeetingEntity) private readonly meetingRepository: Repository<MeetingEntity>,
        @InjectRepository(MeetingCommentsEntity) private readonly meetingCommentRepository: Repository<MeetingCommentsEntity>,
        @InjectRepository(MeetingReportEntity) private readonly meetingReportRepository: Repository<MeetingReportEntity>,
        @InjectRepository(MeetingPhotosEntity) private readonly meetingPhotosRepository: Repository<MeetingPhotosEntity>,
        @InjectRepository(MeetingVideosEntity) private readonly meetingVideoRepository: Repository<MeetingVideosEntity>,
        @InjectRepository(MeetingMembersEntity) private readonly meetingMembersRepository: Repository<MeetingEntity>,
        @InjectRepository(MeetingCommentReplyEntity) private readonly meetingCommentReplyRepository: Repository<MeetingCommentReplyEntity>,
        @InjectRepository(MeetingReportCateogryEntity) private readonly meetingReportCateogryEntity: Repository<MeetingReportCateogryEntity>
    ) {

    }

    async getMeetings(query: MeetingQueryDao, sessionUser): Promise<MeetingEntity | { data: MeetingEntity[], total: number }> {

        let take = 500
        let skip = 0
        if (query.skip)
            skip = query.skip;
        if (query.take)
            take = query.take;

        const db = getRepository(MeetingEntity)
            .createQueryBuilder('m')
            .leftJoin('m.createdBy', 'u')
            .leftJoin('m.city', 'city')
            .leftJoin('m.group', 'group')
            .leftJoin('group.followers', 'gf')
            .leftJoin('gf.user', 'gf_user')
            .leftJoin("m.members", 'mm')
            .leftJoin("mm.user", 'user')
            .andWhere('group.isDeleted != 1')
            .andWhere('m.isDeleted != 1');
        if (sessionUser.role === 'admin') {

        } else {
            if (query.groupId) {
                db.andWhere('group.id= :id', { id: query.groupId });
            } else {
                db.andWhere('(gf_user.id= :id OR group.createdBy= :id)', { id: sessionUser.id });
            }

            if (query.type && query.type === 'upcoming') {
                db.andWhere('m.meetingDate >= DATE(NOW())');
            }

            if (query.type && query.type === 'my-meeting') {
                db.andWhere('u.id = :id', { id: sessionUser.id })
            } else {
                db.andWhere('(m.isPublished = 1 && m.isCanceled = 0)');
            }

        }

        if (query.search) {
            db.where("m.title like :name", { name: '%' + query.search + '%' })
        }

        // get one meeting details   
        if (query.meetingId) { // single meeting
            db.select(["m", "group", "u", "mm", "mp",
                "user", "city",
                "mc", "mv", "mcr", "mcr_createdBy", "mc_createdBy.id", "mc_createdBy.imageUrl", "mc_createdBy.displayName"]);

            db.leftJoin("m.comments", 'mc')
                .leftJoin("mc.createdBy", 'mc_createdBy')
                .leftJoin("mc.replys", 'mcr')
                .leftJoin("mcr.createdBy", 'mcr_createdBy')
                .leftJoin("m.photos", 'mp')
                .leftJoin("m.videos", 'mv')
                .orderBy({ "m.createdDate": "DESC", "mc.createdDate": "DESC" });
            db.where('m.id = :meetingId', { meetingId: query.meetingId });
            const data: any = await db.getOne();
            // data.imageUrl = SERVERBASEPATH + data.imageUrl;
            return this.bindFileBasePath(data);
        } else {
            db.select(["m", "group", "u", "mm",
                "user", "city"])
                .orderBy({ "m.createdDate": "DESC" });
            db.take(take);
            db.skip(skip);
            const [result, total] = await db.getManyAndCount(); // all meeting
            if (result) {
                await result.map(meeting => {
                    return this.bindFileBasePath(meeting);
                });
            }
            return { data: result, total: total };
        }

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
    async createMeeting(meeting: CreateMeetingDto, image): Promise<MeetingEntity> {
        const _meeting = new MeetingEntity();
        _meeting.title = meeting.title;
        _meeting.agenda = meeting.agenda;
        _meeting.meetingDate = meeting.meetingDate;
        _meeting.endDate = meeting.endDate;
        _meeting.startTime = meeting.startTime;
        _meeting.endTime = meeting.endTime;
        _meeting.location = meeting.location;
        _meeting.contactEmail = meeting.contactEmail;
        _meeting.contactMobile = meeting.contactMobile;
        _meeting.isPublished = parseInt(meeting.isPublished);
        if (_meeting.isPublished === 1)
            _meeting.isCanceled = 0;
        console.log('meeting.imageUrl ', meeting.imageUrl);

        if (!meeting.imageUrl || isNull(meeting.imageUrl) || meeting.imageUrl == 'null')
            _meeting.imageUrl = 'uploads/logo.png';

        if (image && image.path)
            _meeting.imageUrl = image.path;

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
        if (meeting.id)
            _meeting.id = parseInt(meeting.id);

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
        return { message: 'Added Comment Successfully', data };
    }
    async addCommentReply(commentDto: CommentReplyDto) {
        const comment = new MeetingCommentReplyEntity();
        comment.createdBy = new UserEntity();
        comment.meetingComment = new MeetingCommentsEntity();
        comment.meetingComment.id = commentDto.meetingCommentId;
        comment.createdBy.id = commentDto.userId;
        comment.comment = commentDto.comment;
        const data = await this.meetingCommentReplyRepository.save(comment);
        return { message: 'Added Comment Successfully', data };
    }
    async addVideo(videoDto: VideoDto) {
        const video = new MeetingVideosEntity();
        video.meeting = new MeetingEntity();
        video.meeting.id = videoDto.meetingId;
        video.videoPath = videoDto.videoPath;
        const data = await this.meetingVideoRepository.save(video);
        return { message: 'Added Video Successfully', data };
    }
    async deleteVideo(videoId: number) {
        const video = new MeetingVideosEntity();
        video.id = videoId;
        return await this.meetingVideoRepository.delete(video);
    }
    async deletePhoto(imageId: number) {
        const photo = new MeetingPhotosEntity();
        photo.id = imageId;
        return await this.meetingPhotosRepository.delete(photo);
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
    async meetingPublishedOrCanceled(meetingId, type) {
        const meeting = new MeetingEntity();
        switch (type) {
            case 'publish':
                meeting.isPublished = 1;
                meeting.isCanceled = 0;
                break;
            case 'cancel':
                meeting.isCanceled = 1;
            default:
                break;
        }
        const data = await this.meetingRepository.update(meetingId, meeting);
        return data;
    }
    async getReports(query): Promise<MeetingReportEntity[]> {
        // return this.meetingReportRepository.find({
        //     relations: ['meeting', 'createdBy', 'meeting.createdBy']
        // });
        const db = getRepository(MeetingReportEntity)
            .createQueryBuilder("mr").select(["mr", "m", "mrc", "c", "mc"]);
        db.leftJoin('mr.meeting', 'm');
        db.leftJoin('mr.category', 'mrc');
        db.leftJoin('mr.createdBy', 'c');
        db.leftJoin('m.createdBy', 'mc');
        if (query.search)
            db.where("mr.comment like :name or c.displayName like :name or m.title like :name", { name: '%' + query.search + '%' })
        db.orderBy({ "mr.createdDate": "DESC" })
        return db.getMany();
    }
    async addReport(reportDto: ReportDto) {
        const report = new MeetingReportEntity();
        report.createdBy = new UserEntity();
        report.meeting = new MeetingEntity();
        report.category = new MeetingReportCateogryEntity();
        report.category.id = reportDto.categoryId;
        report.meeting.id = reportDto.meetingId;
        report.createdBy.id = reportDto.userId;
        report.comment = reportDto.comment;
        const data = await this.meetingReportRepository.save(report);
        return { message: 'Submited Successfully', data };
    }
    async deleteMeeting(meetingId) {
        const meeting = new MeetingEntity();
        meeting.isDeleted = 1;
        return await this.meetingRepository.update(meetingId, meeting);
    }
    async deleteComment(commentId?: number, replyCommentId?: number): Promise<any> {
        if (replyCommentId) {
            const replay = new MeetingCommentReplyEntity();
            replay.id = replyCommentId;
            return this.meetingCommentReplyRepository.delete(replay);
        } else {
            const comment = new MeetingCommentsEntity();
            comment.id = commentId;
            return this.meetingCommentRepository.delete(comment);
        }
    }
    getReportCategoryList(): Promise<any> {

        return this.meetingReportCateogryEntity.findAndCount();
    }

    getReportCategoryInfo(): Promise<any> {

        const db = getRepository(MeetingReportCateogryEntity)
            .createQueryBuilder('c');
        db.loadRelationCountAndMap('c.reportCount', 'c.reports', 'crCount');
        // db.loadRelationCountAndMap('c.meetingCount', 'c.reports.meeting', 'crmCount');
        return db.getMany();
    }

} 
