import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetsEntity } from './assets.entity';
import { Repository } from 'typeorm';
import { APP_CONFIG } from 'src/config';
import sharp from 'sharp';
import * as path from 'path';

export enum AssetType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO',
    BINARY = 'BINARY'
}
export function getAssetType(mimeType: string): AssetType {
    const type = mimeType.split('/')[0];
    switch (type) {
        case 'image':
            return AssetType.IMAGE;
        case 'video':
            return AssetType.VIDEO;
        default:
            return AssetType.BINARY;
    }
}
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
            files.map(f => f.fullPath = APP_CONFIG.SERVERBASEPATH + 'uploads/' + f.fileName);
        }
        return files;
    }

    async generatePreviewImage(mimeType: string, data: Buffer): Promise<Buffer> {
        const assetType = getAssetType(mimeType);
        const { maxWidth, maxHeight } = { maxWidth: 200, maxHeight: 200 };

        if (assetType === AssetType.IMAGE) {
            const image = sharp(data);
            const metadata = await image.metadata();
            const width = metadata.width || 0;
            const height = metadata.height || 0;
            if (maxWidth < width || maxHeight < height) {
                return image.resize(maxWidth, maxHeight, { fit: 'inside' }).toBuffer();
            } else {
                return data;
            }
        } else {
            return sharp(path.join(__dirname, 'file-icon.png'))
                .resize(800, 800, { fit: 'outside' })
                .composite([
                    {
                        input: this.generateMimeTypeOverlay(mimeType),
                        gravity: sharp.gravity.center,
                    },
                ])
                .toBuffer();
        }
    }

    private generateMimeTypeOverlay(mimeType: string): Buffer {
        return Buffer.from(`
            <svg xmlns="http://www.w3.org/2000/svg" height="150" width="800">
            <style>
                text {
                   font-size: 64px;
                   font-family: Arial, sans-serif;
                   fill: #666;
                }
              </style>
              <text x="400" y="110"  text-anchor="middle" width="800">${mimeType}</text>
            </svg>`);
    }
}
