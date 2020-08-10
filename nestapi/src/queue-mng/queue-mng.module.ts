import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { APP_CONFIG } from 'src/config';
import { NotificationQueueController } from './notification-queue.controller';
import { AudioProcessor } from './audio.processor';
@Module({
    imports: [
        BullModule.registerQueue({
            name: 'audio',
            redis: {
                host: APP_CONFIG.REDIS.host,
                port: APP_CONFIG.REDIS.port,
            },
        })
    ],
    providers: [AudioProcessor],
    controllers: [NotificationQueueController]

})
export class QueueMngModule {
}
