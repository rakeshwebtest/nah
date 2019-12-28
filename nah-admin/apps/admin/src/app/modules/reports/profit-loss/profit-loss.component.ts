import { Component, OnInit } from '@angular/core';
import { AppHttpClient } from '../../../utils/app-http-client.service';
import { LocalStorageService } from '../../../utils/local-storage.service';
import { API_CONFIG } from '../../../utils/api-config';

@Component({
  selector: 'theapp-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.scss']
})
export class ProfitLossComponent implements OnInit {
  cols: any = [];
  plList: any = [];
  adminList: any = [];
  agentList: any = [];
  userList: any = [];
  eventList: any = [];
  admin: any = null;
  agent: any = null;
  user: any = null;
  event: any = null;
  sessionInfo: any = {};
  plType: string = 'own';
  constructor(private appHttp: AppHttpClient, private ls: LocalStorageService) {
    this.sessionInfo = this.ls.getItem('user', true);

   }

  ngOnInit() {

    this.getOwnHistory();
    this.cols = [
      { field: 'userId', header: 'User Id' },
      { field: 'sportId', header: 'Sport Id' },
      { field: 'eventId', header: 'Event Id' },
      { field: 'eventTitle', header: 'Event Title' },
      { field: 'p_l', header: 'P_L' }
    ];

  }

  getOwnHistory() {
    this.plList = [];
    if (!this.event) {
      this.eventList = [];
    }
    
    const payload: any = {
      command: "getUserProfitLossStatement",
      requestData: {
        userId: this.sessionInfo.userId
      }
    };
    if (this.event) {
      payload.requestData.eventId = this.event;
    }
    this.appHttp.post(API_CONFIG.BETS, payload).subscribe(res => {
      this.plList = res.data.userBets || [];
      res.data.eventsIds.forEach(item => {
        this.eventList.push({ label: item, value: item });
      });
    });
  }

  getAdmins() {
    this.plList = [];
    this.eventList = [];
    this.adminList = [];
    this.agentList = [];
    this.userList = [];
    const payload = {
      command: "getUserClientsIdsAndEventsIds",
      includeClientsEvents: true,
      requestData: {
        userId: this.sessionInfo.userId
      }
    };

    this.appHttp.post(API_CONFIG.USER, payload).subscribe(res => {
      if (res.data && res.data.clientsIds.length > 0) {
        res.data.clientsIds.forEach(item => {
          this.adminList.push({ label: item, value: item });
        });
      }
      if (res.data && res.data.eventsIds.length > 0) {
        res.data.eventsIds.forEach(item => {
          this.eventList.push({ label: item, value: item });
        });
      }
    });

  }

  getAgents(event) {
    console.log('selected agent -->', event.value);
    this.eventList = [];
    this.agentList = [];
    this.userList = [];
    const payload = {
      command: "getUserClientsIdsAndEventsIds",
      includeSubOrdinatesEvents: true,
      requestData: {
        userId: event.value
      }
    };

    this.appHttp.post(API_CONFIG.USER, payload).subscribe(res => {
      if (res.data && res.data.clientsIds.length > 0) {
        res.data.clientsIds.forEach(item => {
          this.agentList.push({ label: item, value: item });
        });
      }
      if (res.data && res.data.eventsIds.length > 0) {
        res.data.eventsIds.forEach(item => {
          this.eventList.push({ label: item, value: item });
        });
      }
    });

  }

  getUsers(event) {
    console.log('selected user -->', event.value);
    this.eventList = [];
    this.userList = [];
    const payload = {
      command: "getUserClientsIdsAndEventsIds",
      includeSubOrdinatesEvents: true,
      requestData: {
        userId: event.value
      }
    };

    this.appHttp.post(API_CONFIG.USER, payload).subscribe(res => {
      if (res.data && res.data.clientsIds.length > 0) {
        res.data.clientsIds.forEach(item => {
          this.userList.push({ label: item, value: item });
        });
      }
      if (res.data && res.data.eventsIds.length > 0) {
        res.data.eventsIds.forEach(item => {
          this.eventList.push({ label: item, value: item });
        });
      }
    });

  }

  getEvents(event) {
    this.eventList = [];
    console.log('selected user -->', event.value);
    const payload = {
      command: "getUserClientsIdsAndEventsIds",
      includeSubOrdinatesEvents: true,
      requestData: {
        userId: event.value
      }
    };

    this.appHttp.post(API_CONFIG.USER, payload).subscribe(res => {
      if (res.data && res.data.eventsIds.length > 0) {
        res.data.eventsIds.forEach(item => {
          this.eventList.push({ label: item, value: item });
        });
      }
    });

  }

  getEventHistory(event) {
    // this.eventList = [];
    console.log('selected event -->', event.value);
    // this.getOwnHistory();    
  }

  changePlType(type) {
    // this.eventList = [];
    console.log('selected type -->', type.target.value);
    console.log('pl type -->', this.plType);
    if (this.plType === 'clients') {
      if(this.sessionInfo.userType === 'SUPERUSER') {
        this.getAdmins();
      } else if(this.sessionInfo.userType === 'ADMIN') {
        const event: any = {};
        event.value = this.sessionInfo.userId;
        this.getAgents(event);
      } else if(this.sessionInfo.userType === 'AGENT') {
        const event: any = {};
        event.value = this.sessionInfo.userId;
        this.getUsers(event);
      }
      
    } else {
      this.getOwnHistory();
    }

    // this.getOwnHistory();    
  }

  getFilterData() {
    if (this.plType === 'clients') {
      let userId: any = null;
      if (this.user) {
        userId = this.user;
      } else if (this.agent) {
        userId = this.agent;
      } else if (this.admin) {
        userId = this.admin;
      }
      this.plList = [];
      if(!this.event) {
        this.eventList = [];
      }      
      const payload: any = {
        command: "getUserProfitLossStatement",
        requestData: {
          userId: userId
        }
      };
      if (this.event) {
        payload.requestData.eventId = this.event;
      }
      this.appHttp.post(API_CONFIG.BETS, payload).subscribe(res => {
        this.plList = res.data.userBets || [];
        res.data.eventsIds.forEach(item => {
          this.eventList.push({ label: item, value: item });
        });
      });
    } else {
      this.getOwnHistory();
    }

  }
}
