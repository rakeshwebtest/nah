import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat/chat.controller';

@Module({
    controllers:[ChatController],
    providers: [ ChatGateway ]
})
export class ChatModule {}