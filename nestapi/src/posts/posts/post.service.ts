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
@Injectable()
export class PostService {
    constructor(@InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(PostCommentsEntity) private readonly postCommentRepository: Repository<PostCommentsEntity>,
        @InjectRepository(PostCommentReplyEntity) private readonly postCommentReplyRepository: Repository<PostCommentReplyEntity>,
        @InjectRepository(PostBookmarksEntity) private readonly postBookmarksRepository: Repository<PostBookmarksEntity>,
        @InjectRepository(PostLikeEntity) private readonly postLikeRepository: Repository<PostLikeEntity>,
        @InjectRepository(PostDislikeEntity) private readonly postDislikeRepository: Repository<PostDislikeEntity>
    ) {

    }

    async getPosts(query, sessionUser): Promise<PostEntity | { data: PostEntity[], total: number }> {
        let take = 500
        let skip = 0
        if (query.skip)
            skip = query.skip;
        if (query.take)
            take = query.take;

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
                db.andWhere('u.id = :id', { id: sessionUser.id });
            } else {
                db.andWhere('(p.isPublished = 1)');
            }

            if (query.type && query.type === 'bookmarks') {
                db.andWhere('(bu.id = :id )', { id: sessionUser.id });
            }
        }

        // get single post details
        if (query.postId) {
            db.select(["p", "u", "topic"]);
            db.leftJoin("p.comments", 'pc')
                .leftJoin("pc.createdBy", 'pc_createdBy')
                .leftJoin("pc.replys", 'pcr')
                .leftJoin("pcr.createdBy", 'pcr_createdBy')
                .leftJoin("p.photos", 'pp')
                .leftJoin("pp.createdBy", 'pp_createBy')
                .leftJoin("p.videos", 'pv')
                .leftJoin("pv.createdBy", 'pv_createBy')
                .orderBy({ "p.createdDate": "DESC", "pc.createdDate": "DESC" });
            db.where('p.id = :postId', { postId: query.postId });
            const data: any = await db.getOne();
            return data;
        } else {
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
            .leftJoinAndMapOne("p.bookmark", PostBookmarksEntity, "isBookmarkUser", "isBookmarkUser.user.id = " + sessionUser.id + " && isBookmarkUser.post.id = p.id")
            .leftJoinAndMapOne("p.like", PostLikeEntity, "isLikeUser", "isLikeUser.user.id = " + sessionUser.id + " && isLikeUser.post.id = p.id")
            .leftJoinAndMapOne("p.dislike", PostDislikeEntity, "isDislikeUser", "isDislikeUser.user.id = " + sessionUser.id + " && isDislikeUser.post.id = p.id");
        db.where('p.id = :postId', { postId: postId });
        db.select(["p", "u", "topic", "videos", "isBookmarkUser", "isLikeUser", "isDislikeUser", 'photos']);
        const data: any = await db.getOne();
        data.photos = mapImageFullPath(data.photos);
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


        return this.postRepository.save(_post);
        // return data;

    }
    // like dislike bookbark
    async bookmarkPost(data: any) {
        let _entity: any;
        let msgS: string;
        let msgF: string;
        let _repo = this.postBookmarksRepository;
        switch (data.type) {
            case 'like':
                msgS = 'I like this Post';
                msgF = "I remove post form list post";
                _entity = new PostLikeEntity();
                _repo = this.postLikeRepository;
                break;
            case 'dislike':
                msgS = 'I don\'t like this Post';
                msgF = "I remove dislike form list post";
                _entity = new PostDislikeEntity();
                _repo = this.postDislikeRepository;
                break;
            default:
                msgS = 'This post added to my Bookmark';
                msgF = "I removed post form list";
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
        return { message: 'Added Comment Successfully', data };
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


}
