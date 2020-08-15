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
    let width: any;
    let height: any;
    if (query.w) {
      width = parseInt(query.w, null);
    }
    if (query.h) {
      height = parseInt(query.h, null);
    }
    if (width || height || true) {
      const resizeImage = await sharp('./uploads/' + image)
        .rotate()
        .resize(width, height, query.fit)
        .toFormat('jpg').toBuffer();
      return res.end(resizeImage);
    }
    const file = res.sendFile(image, { root: './uploads' });
    return file;
  }
}
