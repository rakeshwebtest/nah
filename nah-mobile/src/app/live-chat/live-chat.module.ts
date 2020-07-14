import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveChatPageRoutingModule } from './live-chat-routing.module';

import { LiveChatPage } from './live-chat.page';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ChatService } from './chat.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveChatPageRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [LiveChatPage],
  providers: [ChatService]
})
export class LiveChatPageModule { }
