import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Queue -test')
@Controller('notification-queue')
export class NotificationQueueController {
    constructor(@InjectQueue('audio') private readonly audioQueue: Queue) { }
    @Post('transcode')
    async transcode() {
        await this.audioQueue.add('transcode', {
            file: 'audio.mp3',
        }, { delay: 9000 });
    }
}
