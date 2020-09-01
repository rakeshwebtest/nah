import { Injectable } from '@nestjs/common';
import { PostEntity } from '../post.entity';
import { AgendaTopicsEntity } from '../agenda-topics.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository, getRepository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCommentsEntity } from '../post-comments.entity';
import { PostCommentReplyEntity } from '../post-comment-reply.entity';
import { PostBookmarksEntity } from '../post-bookmarks.entity';
import { mapImageFullPath, youtubeUrl2EmbedUrl } from 'src/shared/utility';
import { PostLikeEntity } from '../post-like.entity';
import { PostDislikeEntity } from '../post-dislike.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
@Injectable()
export class PostService {
    constructor(
        private readonly notification: NotificationsService,
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(PostCommentsEntity) private readonly postCommentRepository: Repository<PostCommentsEntity>,
        @InjectRepository(PostCommentReplyEntity) private readonly postCommentReplyRepository: Repository<PostCommentReplyEntity>,
        @InjectRepository(PostBookmarksEntity) private readonly postBookmarksRepository: Repository<PostBookmarksEntity>,
        @InjectRepository(PostLikeEntity) private readonly postLikeRepository: Repository<PostLikeEntity>,
        @InjectRepository(PostDislikeEntity) private readonly postDislikeRepository: Repository<PostDislikeEntity>
    ) {

    }

    async getPosts(query, sessionUser): Promise<PostEntity | { data: PostEntity[], total: number }> {
        let take = 500;
        let skip = 0;
        if (query.skip)
            skip = query.skip;
        if (query.take)
            take = query.take;

        const userId = (query.userId) ? query.userId : sessionUser.id;


        const db = getRepository(PostEntity)
            .createQueryBuilder('p')
            .leftJoin('p.createdBy', 'u')
            .leftJoin('p.topic', 'topic')
            .leftJoin('p.bookmark', 'bookmark')
            .leftJoin('p.photos', 'photos')
            .leftJoin('bookmark.user', 'bu')
            .leftJoinAndMapOne("p.bookmark", PostBookmarksEntity, "isBookmarkUser", "isBookmarkUser.user.id = " + sessionUser.id + " && isBookmarkUser.post.id = p.id")
            .leftJoinAndMapOne("p.like", PostLikeEntity, "isLikeUser", "isLikeUser.user.id = " + sessionUser.id + " && isLikeUser.post.id = p.id")
            .leftJoinAndMapOne("p.dislike", PostDislikeEntity, "isDislikeUser", "isDislikeUser.user.id = " + sessionUser.id + " && isDislikeUser.post.id = p.id");
        // .innerJoin('messages.holders', 'holders', 'holders.id = :userId', {userId: currentUser.id})
        // .leftJoinAndSelect('p.bookmark', 'author');

        if (sessionUser.role === 'admin') {

        } else {
            if (query.type && query.type === 'my-posts') {
                if (userId == sessionUser.id) {
                    db.andWhere('u.id = :id', { id: userId });
                } else {
                    db.andWhere('u.id = :id && p.isPublished = 1', { id: userId });
                }
            } else {
                db.andWhere('(p.isPublished = 1)');
            }
            if (query.topicId) {
                db.andWhere('(topic.id = :topicId)', { topicId: query.topicId });
            }

            if (query.type && query.type === 'bookmarks') {
                db.andWhere('(bu.id = :id )', { id: sessionUser.id });
            }
        }

        if (query.search) {
            db.where("(p.title like :name or topic.name like :name  or p.description like :name)", { name: '%' + query.search + '%' });
        }

        db.andWhere("p.isDeleted != 1");

        // conditions blocked user

        db.andWhere(qb => {
            const subQuery = qb.subQuery()
                .select("ub.id")
                .from(UserEntity, "ub")
                .leftJoin('ub.blocked', 'blocked')
                .where('blocked.id=:id', { id: userId })
                .getQuery();
            return "p.createdBy.id NOT IN " + subQuery;
        });

        // get single post details
        db.select(["p", "u", "topic", "isBookmarkUser", "isLikeUser", "isDislikeUser", 'photos'])
            .orderBy({ "p.createdDate": "DESC" });
        db.take(take);
        db.skip(skip);
        const [result, total] = await db.getManyAndCount();
        result.map(r => {
            r.photos = mapImageFullPath(r.photos);
        });
        return { data: result, total: total };


    }
    async getPostId(postId: number, sessionUser) {
        const db = getRepository(PostEntity)
            .createQueryBuilder('p')
            .leftJoin('p.createdBy', 'u')
            .leftJoin('p.topic', 'topic')
            .leftJoin('p.bookmark', 'bookmark')
            .leftJoin('p.photos', 'photos')
            .leftJoin('p.videos', 'videos')
            .leftJoin('bookmark.user', 'bu')
            .leftJoin("p.comments", 'pc')
            .leftJoin("pc.createdBy", 'pc_createdBy')
            .leftJoin("pc.replys", 'pcr')
            .leftJoin("pcr.createdBy", 'pcr_createdBy')
            .leftJoinAndMapOne("p.bookmark", PostBookmarksEntity, "isBookmarkUser", "isBookmarkUser.user.id = " + sessionUser.id + " && isBookmarkUser.post.id = p.id")
            .leftJoinAndMapOne("p.like", PostLikeEntity, "isLikeUser", "isLikeUser.user.id = " + sessionUser.id + " && isLikeUser.post.id = p.id")
            .leftJoinAndMapOne("p.dislike", PostDislikeEntity, "isDislikeUser", "isDislikeUser.user.id = " + sessionUser.id + " && isDislikeUser.post.id = p.id");
        db.where('p.id = :postId', { postId: postId });
        db.select(["p", "u", "pc", "pc_createdBy", "pcr_createdBy", "pcr", "topic", "videos", "isBookmarkUser", "isLikeUser", "isDislikeUser", 'photos'])
            .orderBy({ "pc.createdDate": "DESC" });
        const data: any = await db.getOne();
        data.photos = mapImageFullPath(data.photos);
        return data;
    }
    async getPostIdBasic(postId: number) {
        const db = getRepository(PostEntity)
            .createQueryBuilder('p')
            .leftJoin('p.createdBy', 'u')
            .where('p.id = :postId', { postId });
        db.select(["p", "u"]);
        const data: any = await db.getOne();
        return data;
    }

    async saveUpdatePost(post, sessionUser): Promise<PostEntity> {
        const _post = new PostEntity();
        _post.title = post.title;
        _post.description = post.description;

        const userId = post.createdBy;
        // user 
        _post.createdBy = new UserEntity();
        _post.createdBy.id = sessionUser.id;

        // topic
        _post.topic = new AgendaTopicsEntity();
        _post.topic.id = post.topicId;
        if (post.id)
            _post.id = post.id;

        if (post.photos) {
            _post.photos = post.photos;
        }

        if (post.isDeleted === 1) {
            _post.isDeleted = 1;
        }
        if (post.videos) {
            _post.videos = post.videos.map(v => {
                if (v.videoPath) {
                    v.videoPath = youtubeUrl2EmbedUrl(v.videoPath);
                    return v;
                }
            });
        }


        if (post.isPublished)
            _post.isPublished = post.isPublished;

        const postDetails = await this.postRepository.save(_post);
        // notification send to following memebers
        console.log('post.isPublished', post.isPublished, post.id, (!post.id && post.isPublished === 1));
        console.log('notification sedding');
        if (!post.id && post.isPublished === 1)
            this.notification.send(_post.createdBy.id, null, 'post-create', postDetails);

        return postDetails;
        // return data;
    }
    // like dislike bookbark
    async bookmarkPost(data: any) {
        let _entity: any;
        let msgS: string;
        let msgF: string;
        let _repo = this.postBookmarksRepository;
        const postDetails: any = await this.getPostIdBasic(data.postId);
        switch (data.type) {
            case 'like':
                msgS = 'Liked';
                msgF = "Disliked";
                await this.postDislikeRepository.delete({ post: { id: data.postId }, user: { id: data.userId } }); // delete dislike if exit
                _entity = new PostLikeEntity();
                _repo = this.postLikeRepository;
                break;
            case 'dislike':
                msgS = 'Disliked';
                msgF = "Removed disliked";
                await this.postLikeRepository.delete({ post: { id: data.postId }, user: { id: data.userId } }); // delete dislike if exit
                _entity = new PostDislikeEntity();
                _repo = this.postDislikeRepository;
                break;
            default:
                msgS = 'Added to bookmarks';
                msgF = "Removed post";
                _entity = new PostBookmarksEntity();
                _repo = this.postBookmarksRepository;
                break;
        }

        _entity.post = new PostEntity();
        _entity.post.id = data.postId;
        _entity.user = new UserEntity();
        _entity.user.id = data.userId;
        const isUser = await _repo.findOne(_entity);
        if (isUser) {
            await _repo.delete(isUser);
            return { message: msgF, isUser };
        } else {
            if (data.type === 'like') {
                // send notifications
                this.notification.send(data.userId, postDetails.createdBy.id, 'post-like', postDetails);
            }
            const dataRes = await _repo.save(_entity);
            return { message: msgS, data: dataRes };
        }
    }

    async addComment(commentDto) {
        const comment = new PostCommentsEntity();
        comment.createdBy = new UserEntity();
        comment.post = new PostEntity();
        comment.post.id = commentDto.postId;
        comment.createdBy.id = commentDto.userId;
        comment.comment = commentDto.comment;
        const data = await this.postCommentRepository.save(comment);
        const postDetails: any = await this.getPostIdBasic(commentDto.postId);
        if (commentDto.userId !== postDetails.createdBy.id)
            this.notification.send(commentDto.userId, postDetails.createdBy.id, 'post-comment', postDetails);
        return { message: 'Comment added successfully', data };
    }

    async addCommentReply(commentDto: any) {
        const comment = new PostCommentReplyEntity();
        comment.createdBy = new UserEntity();
        comment.postComment = new PostCommentsEntity();
        comment.postComment.id = commentDto.postCommentId;
        comment.createdBy.id = commentDto.userId;
        comment.comment = commentDto.comment;
        const data = await this.postCommentReplyRepository.save(comment);
        // const postDetails: any = await this.getPostIdBasic(commentDto.postId);
        // if (commentDto.userId !== postDetails.createdBy.id)
        //     this.notification.send(commentDto.userId, postDetails.createdBy.id, 'post-reply-comment', postDetails);
        return { message: 'Comment reply added successfully', data };
    }

    async deleteComment(commentId?: number, replyCommentId?: number): Promise<any> {
        if (replyCommentId) {
            const replay = new PostCommentReplyEntity();
            replay.id = replyCommentId;
            return this.postCommentReplyRepository.delete(replay);
        } else {
            const comment = new PostCommentsEntity();
            comment.id = commentId;
            return this.postCommentRepository.delete(comment);
        }
    }

    async deletePost(id) {
        const post = new PostEntity();
        post.isDeleted = 1;
        return await this.postRepository.update(id, post);
    }


}
