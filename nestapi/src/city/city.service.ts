import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from './city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {
    constructor(@InjectRepository(CityEntity) private readonly cityRepository: Repository<CityEntity>) {
    }
    async getCities(): Promise<CityEntity[]> {
        return this.cityRepository.find();
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
