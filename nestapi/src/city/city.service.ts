import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './city.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class CityService {
    constructor(@InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>) {
    }
    async getCities(query): Promise<{ data: CityEntity[], total: number }> {
        const db = getRepository(CityEntity)
            .createQueryBuilder('c');
        db.select(['c.name', 'c.id']);
        db.loadRelationCountAndMap('c.meetingsCount', 'c.meetings', 'cmCount');
        db.loadRelationCountAndMap('c.usersCount', 'c.users', 'cuCount');
        if (query.search) {
            db.where("c.name like :name", { name: '%' + query.search + '%' })
        }
        db.orderBy('id', 'DESC');

        if (query.take)
            db.take(query.take);
        if (query.skip)
            db.skip(query.skip);

        const [result, total] = await db.getManyAndCount();
        return { data: result, total: total };
    }
    async getCitiesInfo(): Promise<CityEntity[]> {
        const db = getRepository(CityEntity)
            .createQueryBuilder('city');
        db.loadRelationCountAndMap('city.meetingsCount', 'city.meetings', 'cmCount');
        db.loadRelationCountAndMap('city.usersCount', 'city.users', 'cuCount');
        return db.getMany();
    }
    async createUpdateCity(city): Promise<CityEntity> {
        return this.cityRepository.save(city);
    }
    async deleteCity(cityId: number): Promise<any> {
        let city = new CityEntity();
        city.id = cityId;
        return this.cityRepository.delete(city);
    }
}
