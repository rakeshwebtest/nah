import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  getData() {
    return { message: "ok" };
  }
  @Get('uploads/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }
}
