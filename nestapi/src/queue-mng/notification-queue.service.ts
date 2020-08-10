import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
@Injectable()
export class NotificationQueueService {
    constructor(@InjectQueue('notificationQ') private readonly notificationQ: Queue) { }

    async add() {
        const job = await this.notificationQ.add({
            foo: 'bar',
        }, { delay: 3000 });
    }
}
