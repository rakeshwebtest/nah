import { Req, Res, Injectable } from '@nestjs/common';
// import * as multer from 'multer';
// import * as AWS from 'aws-sdk';
// // import * as multerS3 from 'multer-s3';
// // const multerS3 = require("multer-sharp-s3");
import { APP_CONFIG } from 'src/config';
// const AWS_S3_BUCKET_NAME = 'theappin';
// const s3 = new AWS.S3();
import { S3 } from 'aws-sdk';
import { Logger } from '@nestjs/common';

// AWS.config.update({
//     accessKeyId: APP_CONFIG.S3.AWS_ACCESS_KEY_ID,
//     secretAccessKey: APP_CONFIG.S3.AWS_SECRET_ACCESS_KEY,
// });

@Injectable()
export class S3ImageUploadService {
    constructor() { }

    async upload(files) {
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const { originalname } = file;
            const data = await this.uploadS3(file.buffer, originalname);
            console.log('data', data);
        }
    }

    async uploadS3(file, name) {
        const s3 = this.getS3();
        const params = {
            Bucket: APP_CONFIG.S3.AWS_S3_BUCKET_NAME,
            Key: String(name),
            Multiple: true,
            ACL: 'public-read',
            Body: file,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    Logger.error(err);
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }

    getS3() {
        return new S3({
            accessKeyId: APP_CONFIG.S3.AWS_ACCESS_KEY_ID,
            secretAccessKey: APP_CONFIG.S3.AWS_SECRET_ACCESS_KEY,
        });
    }
}