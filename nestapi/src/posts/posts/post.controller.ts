import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
@ApiTags('posts')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostService) { }

    @Get()
    async getAgenda(@Body() agenda: any, @Query() query, @Req() req) {

        return { message: false, data: [] };
    }

    async createPost(@Body() post) {
        let msg = 'Created successfully';
        if (post.id) {
            msg = 'Updated successfully';
        }
        const data = await this.postService.savePost(post);
        return { message: msg, success: true, data };

    }

}
