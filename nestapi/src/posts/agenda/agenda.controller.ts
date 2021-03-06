import { Controller, Get, Query, Req, Post, Body } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateAgendaDto, GetAgendasDto } from './agendaDto';

@ApiTags('Agenda')
@ApiBearerAuth()
@Controller('agenda')
export class AgendaController {
    constructor(public service: AgendaService) { }

    @Get()
    async getAgenda(@Body() agenda: any, @Query() query: GetAgendasDto, @Req() req) {
        const sessionUser = req.sessionUser;
        let data: any;
        if (query.agendaId) {
            data = await this.service.getAgendaById(query.agendaId);
        } else {
            data = await this.service.getAgendasByUser(sessionUser.id);
        }
        return { message: false, data };
    }

    @Get('topics')
    async getTopics(@Query() query, @Req() req) {
        const sessionUser = req.sessionUser;
        const data: any = await this.service.getTopics(query, sessionUser);
        // urse:req.sessionUser
        return { message: false, ...data };
    }
    
    @Get('check')
    async check(@Query() query, @Req() req) {
        const sessionUser = req.sessionUser;
        const data = await this.service.check(sessionUser.id);
        return { message: false, data: data || false };
    }

    @Post()
    async createAgendas(@Body() agenda, @Req() req) {
        let msg = 'Agenda created successfully';
        const sessionUser = req.sessionUser;
        const data = await this.service.saveUpdate(agenda, sessionUser);
        if(!agenda.isPublish) {
            msg = "Agenda drafted successfully";
        }
        return { message: msg, success: true, agenda, data }

    }



}
