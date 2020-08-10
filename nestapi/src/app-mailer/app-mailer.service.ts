import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AppMailerService {
    constructor(private readonly mailerService: MailerService) { }
    send(_to: string, _template: string, _context: any) {

        this.mailerService
            .sendMail({
                to: _to, // list of receivers
                from: 'NAH Mobile App <support@nah.com>', // sender address
                subject: 'Welcome To NAH', // Subject line
                // text: 'welcome', // plaintext body
                // html: '<b>welcome</b>', // HTML body content
                template: _template,
                context: _context
            })
            .then((res) => {
                return res;
            })
            .catch((e) => {
                console.log('email error', e);
                return e;
            });
    }
}
