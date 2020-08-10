import { Controller, Post, Get, Body } from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { ApiTags, ApiProperty, ApiConsumes } from '@nestjs/swagger';
export class MailerDto {
    @ApiProperty()
    to: string;
    @ApiProperty()
    from: string;
    @ApiProperty()
    subject: string;
    @ApiProperty({ required: true, default: 'template', enum: ["template", "text", "html"] })
    bodyType: string;
    @ApiProperty({ default: 'welcome' })
    body: string;
    @ApiProperty({ default: {} })
    data: any;
}
@ApiTags('Mailer Services')
@Controller('app-mailer')
export class AppMailerController {
    constructor(private readonly mailerService: MailerService) { }
    @Post()
    async sendEmail(@Body() mailer: MailerDto) {
        const mailerObj: ISendMailOptions = {
            to: mailer.to,
            from: 'NAH Mobile App <support@nah.com>',
            subject: mailer.subject || 'Welcome To NAH',
        };

        switch (mailer.bodyType) {
            case "template":
                mailerObj.template = mailer.body;
                break;
            case "html":
                mailerObj.html = mailer.body;
                break;
            default:
                mailerObj.text = mailer.body;
                break;
        }
        if (mailer.data) {
            mailerObj.context = mailer.data;
        }

        const data = await this
            .mailerService
            .sendMail(mailerObj)
            .then((res) => {
               // console.log('email sent', res);
                return res;
            })
            .catch((e) => {
               // console.log('email error', e);
                return e;
            });

        return data;
    }
}
