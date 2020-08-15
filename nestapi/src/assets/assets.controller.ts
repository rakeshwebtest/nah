import { Controller, UseInterceptors, Post, UploadedFile, UploadedFiles, Body, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
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
    console.log('file', file);
    if (!file.originalname.match(/\.(jpg|jpeg|JPG|JPEG|Jpeg|png|PNG|gif)$/)) {
        return callback(new HttpException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Only image files are allowed!'
        }, HttpStatus.BAD_REQUEST), false);
        // return callback({ message: "Only image files are allowed!" }, false);
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
@ApiTags('Asset')
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
        const img = await this.assetS.saveFile(response);
        return { message: false, success: true, data: img };
    }
    // multiple file upploads
    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(
        FilesInterceptor('images[]', 20, {
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


        try {
            const images = await this.assetS.saveFiles(response);
            return { message: false, success: true, data: images };
        } catch (error) {
            return { message: "Only image files are allowed!" };
        }

    }

    // @Post()
    // async create(@Req() request, @Res() response) {
    //     try {
    //         await this.imageUploadService.fileupload(request, response);
    //     } catch (error) {
    //         return response
    //             .status(500)
    //             .json(`Failed to upload image file: ${error.message}`);
    //     }
    // }

    @Post('s3')
    @UseInterceptors(FilesInterceptor('images[]'))
    async upload(@UploadedFiles() files) {
        console.log('files', files);
        // const data = await this.imageUploadService.upload(files);
        // return data;
    }
}
