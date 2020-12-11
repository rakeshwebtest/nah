import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { AgendaEntity } from '../agenda.entity';
import { AgendaTopicsEntity } from '../agenda-topics.entity';

@Injectable()
export class AgendaService {
    constructor(@InjectRepository(AgendaEntity) private readonly agendaRepository: Repository<AgendaEntity>, @InjectRepository(AgendaTopicsEntity) private readonly agendaTopicsRepository: Repository<AgendaTopicsEntity>) {

    }
    async getAgendasByUser(id) {

        return await this.agendaRepository.find({ where: [{ createdBy: id }], order: { updatedDate: 'DESC' } });
    }

    async getTopics1(query, sessionUser) {

        // const db = getRepository(AgendaTopicsEntity)
        //     .createQueryBuilder('topic')
        //     .orderBy({ "topic.createdDate": "DESC" });
        // if (query.search) {
        //     db.andWhere("(topic.name like :name)", { name: '%' + query.search + '%' });
        // }


        return await this.agendaTopicsRepository.find();


    }

    async getTopics(query, sessionUser): Promise<{ data: AgendaTopicsEntity[], total: number }> {
        const db = getRepository(AgendaTopicsEntity)
            .createQueryBuilder('t', );
        db.select(['t', 'agenda', 'createdBy']);
        db.leftJoin('t.agenda', 'agenda');
        db.leftJoin('agenda.createdBy', 'createdBy');
        if (query.search) {
            db.where("t.name like :name", { name: '%' + query.search + '%' })
        }
        db.orderBy('t.id', 'DESC');
        if (query.take)
            db.take(query.take);
        if (query.skip)
            db.skip(query.skip);

        const [result, total] = await db.getManyAndCount();
        return { data: result, total: total };
    }

    async getAgendaById(id) {
        return await this.agendaRepository.findOne({ id: id });
    }
    async check(id) {

        // const db = getRepository(AgendaEntity)
        // .createQueryBuilder("a");
        // db.where('a.createdBy=:id && a.status=:status', { id: id, status:'published'});
        // //db.andWhere('a.status=:status', {  status:'published'});
        // const data = await db.getOne();
        const data = await this.agendaRepository.findOne({ createdBy: id, isPublish: 1 }, { order: { updatedDate: 'DESC' } });
        return this.mapAgenda(data);
    }
    async saveUpdate(req, sessionUser) {
        if (req.isPublish) {
            req.status = 'publish';
        }
        // if(req.isPublish){
        //     // const startDate = new Date();
        //     // const days = (1000 * 60 * 60 * 24) * 7;
        //     // const endDate = new Date(startDate.getTime() + days);
        //     // req.startDate = startDate;
        //     // req.endDate = endDate;
        // }
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
