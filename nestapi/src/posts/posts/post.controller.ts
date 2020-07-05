import { Controller, Get, Post, Body, Query, Req, Request, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostQueryDao, SavePostDto } from '../dto/post.dto';

@ApiBearerAuth()
@ApiTags('posts')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostService) { }

    @Get('list')
    async getPosts(@Query() query: PostQueryDao, @Req() req) {
        const sessionUser = req['sessionUser'];
        let data: any;
        if (query.postId) {
            data = await this.postService.getPosts(query, sessionUser);
            return { message: false, data, success: true };
        } else {
            data = await this.postService.getPosts(query, sessionUser);
            return { message: false, success: true, ...data, query };
        }
    }

    @Post()
    async saveUpdatePost(@Body() post: SavePostDto, @Req() req) {
        const sessionUser = req.sessionUser;
        let msg = 'Created successfully';
        if (post.id) {
            msg = 'Updated successfully';
        }
        console.log('sessionUser', sessionUser, req);
        const data = await this.postService.saveUpdatePost(post, sessionUser);
        return { message: msg, success: true, data };

    }

    /**
  * post bookmark
  */

    @Post('bookmark')
    async bookmarkPost(@Body() bookmark, @Request() req) {
        const sessionUser = req.sessionUser;
        bookmark.userId = sessionUser.id;
        return this.postService.bookmarkPost(bookmark);
    }

    @Post('comment')
    async addComment(@Body() comment, @Request() req) {
        return this.postService.addComment(comment);
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

}
