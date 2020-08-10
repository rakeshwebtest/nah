import { AppMailerController } from './app-mailer.controller';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { APP_CONFIG } from 'src/config';
import { AppMailerService } from './app-mailer.service';
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        transport: APP_CONFIG.SMTP,
        defaults: {
          from: '"NAH Mobile App" <support@nah.com>',
        },
        template: {
          dir: __dirname + './../../mail-templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    })
  ],
  controllers: [AppMailerController],
  providers: [AppMailerService]
})
export class AppMailerModule { }
