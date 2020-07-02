import { Injectable } from '@nestjs/common';
import { PostEntity } from '../post.entity';
import { AgendaTopicsEntity } from '../agenda-topics.entity';
import { UserEntity } from 'src/user/user.entity';
import { Repository, getRepository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCommentsEntity } from '../post-comments.entity';
import { PostCommentReplyEntity } from '../post-comment-reply.entity';
import { PostBookmarksEntity } from '../post-bookmarks.entity';

@Injectable()
export class PostService {
    constructor(@InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(PostCommentsEntity) private readonly postCommentRepository: Repository<PostCommentsEntity>,
    @InjectRepository(PostCommentReplyEntity) private readonly postCommentReplyRepository: Repository<PostCommentReplyEntity>,
    @InjectRepository(PostBookmarksEntity) private readonly postBookmarksRepository: Repository<PostBookmarksEntity>,
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
            .leftJoin('p.topic', 'topic');

        if (sessionUser.role === 'admin') {

        } else {
            if (query.type && query.type === 'my-posts') {
                db.andWhere('u.id = :id', { id: sessionUser.id })
            } else {
                db.andWhere('(p.isPublished = 1 && p.isCanceled = 0)');
            }
        }

        // get single post details   
        if (query.postId) { 
            db.select(["p", "u", "topc"]);
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
            db.select(["p", "u", "topic"])
                .orderBy({ "p.createdDate": "DESC" });
            db.take(take);
            db.skip(skip);
            const [result, total] = await db.getManyAndCount();
            return { data: result, total: total };
        }

    }

    async saveUpdatePost(post): Promise<PostEntity> {
        const _post = new PostEntity();
        _post.title = post.title;
        _post.description = post.description;

        const userId = parseInt(post.createdBy);
        // user 
        _post.createdBy = new UserEntity();
        _post.createdBy.id = userId;

        // topic
        _post.topic = new AgendaTopicsEntity();
        _post.topic.id = parseInt(post.topicId);
        if (post.id)
            _post.id = parseInt(post.id);

        return this.postRepository.save(_post);
        // return data;

    }

    async bookmarkPost(bookmarkDto: any) {
        const bookmark = new PostBookmarksEntity();
        bookmark.post = new PostEntity();
        bookmark.post.id = bookmarkDto.postId;
        bookmark.user = new UserEntity();
        bookmark.user.id = bookmarkDto.userId;

        const isBookmark = await this.postBookmarksRepository.findOne(bookmark);
        if (isBookmark) {
            await this.postBookmarksRepository.delete(isBookmark);
            return { message: 'Successfully Updated', isBookmark };
        } else {
            const data = await this.postBookmarksRepository.save(bookmark);
            return { message: 'Successfully Updated', data };
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
