import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportCateogryEntity } from './report-category.entity';

@Injectable()
export class ReportCategoryService {
    constructor(@InjectRepository(ReportCateogryEntity) private readonly categoryRepository: Repository<ReportCateogryEntity>) {

    }

    getReportCategoryList(): Promise<any> {

        return this.categoryRepository.findAndCount();
    }
}
