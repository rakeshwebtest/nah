import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './city.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class CityService {
    constructor(@InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>) {
    }
    async getCities(search): Promise<CityEntity[]> {
        const db = getRepository(CityEntity)
        .createQueryBuilder('city');
        if (search) {
            db.where("city.name like :name", { name: '%' + search + '%' })
        }
        return db.getMany();
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
