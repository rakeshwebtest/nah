
import { Controller, Get, Post, Body, Query, Req, Request, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostQueryDao, SavePostDto, bookmarkDto, BookmarkLikeAndDislikeParamDto } from '../dto/post.dto';
import { diskStorage } from 'multer';
import { mapImageFullPath } from 'src/shared/utility';

@ApiBearerAuth()
@ApiTags('Post')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostService) { }

    @Get('list')
    async getPosts(@Query() query: PostQueryDao, @Req() req: any) {
        const sessionUser = req['sessionUser'];
        let data: any = [];
        if (query.postId) {
            data = await this.postService.getPosts(query, sessionUser);
            return { message: false, data, success: true };
        } else {
            data = await this.postService.getPosts(query, sessionUser);
            return { message: false, success: true, ...data, query };
        }
    }
    @Get(':id')
    async getPostId(@Param('id') id: number, @Req() req: any) {
        const sessionUser = req['sessionUser'];
        const data = await this.postService.getPostId(id, sessionUser);
        return { message: false, data, success: true };
    }

    @Post()
    async saveUpdatePost(@Body() post: SavePostDto, @Req() req) {
        const sessionUser = req.sessionUser;
        let msg = 'Post created successfully';
        if (post.id) {
            if (post.isDeleted === 1) {
                msg = 'Deleted successfully';
            } else {
                msg = 'Updated successfully';
            }
        }
        const data = await this.postService.saveUpdatePost(post, sessionUser);
        return { message: msg, success: true, data };
    }

    /**
    * 
    *  get bookmark like and dislike post
    */

    @Post('bookmarkLikeAndDislike')
    async bookmarkPost(@Body() postData: BookmarkLikeAndDislikeParamDto, @Request() req) {
        const sessionUser = req.sessionUser;
        const params = {
            userId: sessionUser.id,
            type: postData.type,
            postId: postData.postId
        };
        return this.postService.bookmarkPost(params);
    }

    @Post('comment')
    async addComment(@Body() comment, @Request() req) {
        return this.postService.addComment(comment);
    }

    @Post('comment-reply')
    async addCommentReplay(@Body() commentReply, @Request() req) {
        return this.postService.addCommentReply(commentReply);
    }
    /**
     *
     * @param id
     */
    @Delete('comment/:commentId')
    async deleteComment(@Param('commentId') id: number) {
        const data = await this.postService.deleteComment(id);
        return { message: 'Deleted successfull', success: true, data };
    }

    @Delete(':id')
    async deletePost(@Param('id') id: any) {
      const data = await this.postService.deletePost(id);
      return { message: 'Post deleted successfully', success: true, data };
    }

}
