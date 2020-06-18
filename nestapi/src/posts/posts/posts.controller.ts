import { Controller, Get, Body, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('posts')
@Controller('posts')
export class PostsController {

    constructor() { }

    @Get()
    async getAgenda(@Body() agenda: any,@Query() query, @Req() req) {

        return { message: false, data:[] };
    }
    
}
