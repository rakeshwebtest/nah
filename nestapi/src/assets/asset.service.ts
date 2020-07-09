import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetsEntity } from './assets.entity';
import { Repository } from 'typeorm';
import { SERVERBASEPATH } from 'src/config';
@Injectable()
export class AssetService {

    constructor(@InjectRepository(AssetsEntity) private readonly assetsRepository: Repository<AssetsEntity>) {
    }

    async saveFile(file: AssetsEntity) {
        return this.assetsRepository.save(file);
    }
    async saveFiles(file: AssetsEntity[]) {
        const files = await this.assetsRepository.save(file);
        return this.getFullPath(files);
    }
    getFullPath(files: any[]) {
        if (files && files.length > 0) {
            files.map(f => f.fullPath = SERVERBASEPATH + 'uploads/' + f.fileName);
        }
        return files;
    }
}
