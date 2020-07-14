import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.page.html',
  styleUrls: ['./live-chat.page.scss'],
})
export class LiveChatPage implements OnInit {
  public users: number = 0;
  public message: string = '';
  public messages: string[] = [];
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.receiveChat().subscribe((message: string) => {
      this.messages.push(message);
    });

    this.chatService.getUsers().subscribe((users: number) => {
      this.users = users;
    });

  }
  addChat() {
    this.messages.push(this.message);
    this.chatService.sendChat(this.message);
    this.message = '';
  }

}
