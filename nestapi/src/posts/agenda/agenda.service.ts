import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { AgendaEntity } from '../agenda.entity';

@Injectable()
export class AgendaService {
    constructor(@InjectRepository(AgendaEntity) private readonly agendaRepository: Repository<AgendaEntity>) {

    }
    async getAgenda(id) {

        return await this.agendaRepository.findOne({ createdBy: id });;
    }
    async check(id) {

        // const db = getRepository(AgendaEntity)
        // .createQueryBuilder("a");
        // db.where('a.createdBy=:id && a.status=:status', { id: id, status:'published'});
        // //db.andWhere('a.status=:status', {  status:'published'});
        // const data = await db.getOne();
        const data = await this.agendaRepository.findOne({ createdBy: id, isPublish: 1 });
        return this.mapAgenda(data);
    }
    async saveUpdate(req,sessionUser) {
        if(req.isPublish){
            const startDate = new Date();
            const days = (1000 * 60 * 60 * 24) * 7;
            const endDate = new Date(startDate.getTime() + days);
            req.startDate = startDate;
            req.endDate = endDate;
        }
        req.createdBy = sessionUser.id;
        const data = await this.agendaRepository.save(req);
        return data;

    }
    //map data if expaired 
    mapAgenda(data) {
        if (data) {
            data.isExpired = false;
        }
        return data;
    }
    delete() {


    }

}
