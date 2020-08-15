import { Controller, Get, Param, Res, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as sharp from 'sharp';
import { ImageResizeOptionsDto } from './assets/asset.dto';

@ApiTags('App')
@Controller()
export class AppController {
  constructor() { }

  @Get()
  getData() {
    return { message: "ok" };
  }
  @Get('uploads/:imgpath')
  async seeUploadedFile(@Param('imgpath') image, @Res() res, @Query() query: ImageResizeOptionsDto) {
    // try {
    //   if (query.w || query.h) {
    //     let width: any;
    //     let height: any;
    //     if (query.w) {
    //       width = parseInt(query.w, null);
    //     }
    //     if (query.h) {
    //       height = parseInt(query.h, null);
    //     }
    //     const imagePath = await sharp('./uploads/' + image)
    //       .rotate()
    //       .resize(width, height, query.fit)
    //       .toBuffer()
    //       .then(data => {
    //         console.log('data', data);
    //         return data;
    //       })
    //       .catch(err => {
    //         return err;
    //       });

    //     return res.end(imagePath, 'binary');
    //   } else {
    //     const file = res.sendFile(image, { root: './uploads' });
    //     return file;
    //   }
    // } catch (error) {
    //   const file = res.sendFile(image, { root: './uploads' });
    //   return file;
    // }

    const file = res.sendFile(image, { root: './uploads' });
    return file;
  }
}
