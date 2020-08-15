import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('App')
@Controller()
export class AppController {
  constructor() { }

  @Get()
  getData() {
    return { message: "ok" };
  }
  @Get('uploads/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    const file = res.sendFile(image, { root: './uploads' });
    return file;
  }
}
