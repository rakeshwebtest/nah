import { Controller, Get, Query, Req, Post, Body } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateAgendaDto } from './agendaDto';

@ApiTags('agenda')
@ApiBearerAuth()
@Controller('agenda')
export class AgendaController {
    constructor(public service: AgendaService) { }

    @Get()
    async getAgenda(@Body() agenda: any,@Query() query, @Req() req) {
        const sessionUser = req.sessionUser;
        const data = await this.service.getAgenda(sessionUser.id);
        return { message: false, data };
    }
    @Get('check')
    async check(@Query() query, @Req() req) {
        const sessionUser = req.sessionUser;
        const data = await this.service.check(sessionUser.id);
        return { message: false, data:data || false };
    }

    @Post()
    async createAgendas(@Body() agenda: CreateAgendaDto, @Req() req) {
        const sessionUser = req.sessionUser;
        const data = await this.service.saveUpdate(agenda,sessionUser);
        return { message: 'Save successfully', success: true, agenda, data }

    }



}
