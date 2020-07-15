import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    users: number = 0;
    connectedClients = [];
    data = {};
    private logger: Logger = new Logger('EventsGateway');
     nicknames: Map<string, string> = new Map();

    async handleConnection(client: Socket) {

        // A client has connected
       //  this.connectedClients = [...this.connectedClients, client.id];
        // this.logger.log(
        //     `Client connected: ${client.id} - connected clients.`
        // );

        // this.users++;

        // this.server.emit('users', this.connectedClients);
        // client.emit('data', this.data);
        // Notify connected clients of current users
        // this.server.emit('users', this.users);

    }

    // async handleDisconnect(client: Socket) {

    //     // A client has disconnected
    //     this.users--;

    //     // Notify connected clients of current users
    //     // this.server.emit('users', this.users);
    //     this.connectedClients = this.connectedClients.filter(
    //         connectedClient => connectedClient !== client.id
    //     );
    //     this.logger.log(
    //         `Client disconnected: ${client.id} - ${this.connectedClients.length} connected clients.`
    //     );
    //     this.server.emit('users', this.connectedClients);

    // }

    // @SubscribeMessage('chat')
    // async onChat(client, message) {
    //     client.broadcast.emit('chat', message);
    // }



  handleDisconnect(client: Socket) { 
    const deletedUser = this.nicknames[client.id];
    delete this.nicknames[client.id];
    client.server.emit('users-changed', {user: deletedUser, event: 'left',liveUsers:this.nicknames});
   
  }

  @SubscribeMessage('set-nickname') 
  setNickname(client: Socket, nickname: string) {
    this.nicknames[client.id] = nickname;
     this.logger.log(
            `Client connected: ${client.id}  ${this.nicknames[client.id]} - connected clients.`
        );
    client.server.emit('users-changed', {user: nickname, event: 'joined',liveUsers:this.nicknames}); 
  }

  @SubscribeMessage('add-message') 
  addMessage(client: Socket, message) {
    client.server.emit('message', {text: message.text, from: this.nicknames[client.id], created: new Date()});
  }
}