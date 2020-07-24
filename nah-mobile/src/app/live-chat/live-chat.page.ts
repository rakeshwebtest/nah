import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import { Socket } from 'ngx-socket-io';
import { ToastController, IonContent } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.page.html',
  styleUrls: ['./live-chat.page.scss'],
})
export class LiveChatPage implements OnInit, OnDestroy {
  public conectedClients = [];
  public message = '';
  public messages: any[] = [];
  nickname: string;
  liveUsers = [];
  @ViewChild(IonContent, null) content: IonContent;
  constructor(private chatService: ChatService, private socket: Socket, private toastCtrl: ToastController,
    private authService: AuthenticationService) { }

  ngOnInit() {
    const userInfo: any = this.authService.isAuthenticated();
    // this.chatService.receiveChat().subscribe((message: string) => {
    //   this.messages.push(message);
    // });

    // this.chatService.getUsers().subscribe((users: any) => {
    //   this.conectedClients = users;
    // });
    // this.chatService.getCientData().subscribe((data) => {
    //   console.log('data', data);
    // });
    this.nickname = userInfo.user.displayName;
    this.joinChat();
    this.chatService.getMessages().subscribe(message => { this.messages.push(message); this.updateScroll(); });
    // this.socket.on('message', message => this.messages.push(message));

    this.socket.on('users-changed', (data: any) => {
      const user = data['user'];
      if (data.liveUsers) {
        this.liveUsers = Object.keys(data.liveUsers);
      }
      console.log('this.liveUsers', this.liveUsers);
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });

  }
  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
  }
  addChat() {
    this.messages.push(this.message);
    this.chatService.sendChat(this.message);
    this.message = '';
  }
  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
    this.updateScroll();
  }
  ngOnDestroy() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  updateScroll() {
    if (this.content.scrollToBottom) {
      this.content.scrollToBottom(50);
    }
  }

}
