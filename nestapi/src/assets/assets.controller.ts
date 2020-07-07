import { Controller, UseInterceptors, Post, UploadedFile, UploadedFiles, Body } from '@nestjs/common';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { AssetService } from './asset.service';
import { AssetsEntity } from './assets.entity';

export class ImageDto {
    @ApiProperty({ type: 'file' })
    image: any;
}
export class ImagesDto {
    @ApiProperty({ type: 'file' })
    image: any;
}

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};

@Controller('asset')
export class AssestsController {
    constructor(public assetS: AssetService) {

    }
    @ApiConsumes('multipart/form-data')
    @Post('single')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/posts',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file, @Body() data: ImageDto) {
        const response: AssetsEntity = new AssetsEntity();
        response.originalName = file.originalname;
        response.fileName = file.filename;
        response.type = file.fieldname;
        response.mimeType = file.mimetype;
        response.fileSize = file.size;
        response.source = file.path;
        return this.assetS.saveFile(response);
    }
    // multiple file upploads
    @ApiConsumes('multipart/form-data')
    @Post()
    @UseInterceptors(
        FilesInterceptor('image', 20, {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadMultipleFiles(@UploadedFiles() files, @Body() data: ImagesDto) {
        const response: AssetsEntity[] = [];
        files.forEach(file => {
            let resFile: any = new AssetsEntity();
            resFile = {
                originalName: file.originalname,
                fileName: file.filename,
                type: file.fieldname,
                mimeType: file.mimetype,
                fileSize: file.size,
                source: file.path
            };
            response.push(resFile);
        });

        return this.assetS.saveFiles(response);
    }
}
