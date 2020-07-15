import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {

  }

  sendChat(message) {
    this.socket.emit('chat', message);
  }

  receiveChat() {
    return this.socket.fromEvent('chat');
  }

  getMessages() {
    return this.socket.fromEvent('message');
  }

  getUsers() {
    return this.socket.fromEvent('users');
  }

  getCientData() {
    return this.socket.fromEvent('data');
  }
}
