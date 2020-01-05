import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppHttpClient } from '../utils/app-http-client.service';
import { API_CONFIG } from '../utils/api-config';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public scoreDetails: any[] = [];
  public cols: any[] = [];
  public eventDetails: any[] = [];
  sportsList: any = [];
  activeEventType = 'all'; // all today tomorrow
  data:any;
  constructor(private router: Router, private appHttp: AppHttpClient) { }

  ngOnInit() {


    this.getSports('all');
    // this.scoreDetails = [
    //   { team: 'Sussex', innings1: '0', innings2: '0', score1: '56', score2: '56', back1: 45, back2: 76, lay1: 45, lay2: 76, total1: 76, total2: 79 },
    //   { team: 'Surrey', innings1: '0', innings2: '0', score1: '56', score2: '56', back1: 45, back2: 76, lay1: 45, lay2: 76, total1: 76, total2: 79 },
    //   { team: 'Somerset', innings1: '0', innings2: '0', score1: '56', score2: '56', back1: 45, back2: 76, lay1: 45, lay2: 76, total1: 76, total2: 79 },
    //   { team: 'Worcestershire', innings1: '0', innings2: '0', score1: '56', score2: '56', back1: 45, back2: 76, lay1: 45, lay2: 76, total1: 76, total2: 79 },
    //   { team: 'Lancashire', innings1: '0', innings2: '0', score1: '56', score2: '56', back1: 45, back2: 76, lay1: 45, lay2: 76, total1: 76, total2: 79 },
    //   { team: 'Yorkshire', innings1: '0', innings2: '0', score1: '56', score2: '56', back1: 45, back2: 76, lay1: 45, lay2: 76, total1: 76, total2: 79 },
    //   { team: 'Hampshire', innings1: '0', innings2: '0', score1: '56', score2: '56', back1: 45, back2: 76, lay1: 45, lay2: 76, total1: 76, total2: 79 },
    //   { team: 'Nottinghamshire', innings1: '0', innings2: '0', score1: '56', score2: '56', back1: 45, back2: 76, lay1: 45, lay2: 76, total1: 76, total2: 79 },
    //   { team: 'Middlesex', innings1: '0', innings2: '0', score1: '56', score2: '56', back1: 45, back2: 76, lay1: 45, lay2: 76, total1: 76, total2: 79 },
    // ];
    // this.eventDetails = [
    //   {
    //     eventName: 'West Indies v India (1st Test)',
    //     eventStatus: 'In-play'
    //   },
    //   {
    //     eventName: 'Australia v England (4th Test)',
    //     eventStatus: 'Going In-play'
    //   },
    //   {
    //     eventName: 'Sri lanka v Newzealand (2nd Test)',
    //     eventStatus: 'In-play'
    //   }
    // ]
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  }
  }
  getSports(type = 'all') {
    this.activeEventType = type;
    // switch (event.index) {
    //   case /t: // today
    //     type = 'today';
    //     break;
    //   case 2: // tomorrow
    //     type = 'tomorrow';
    //     break;
    //   default:
    //     type = 'all';
    //     break;
    // }
    const payload = {
      "command": "listEvents",
      "sportId": "4",
      "eventMode": type,
      "userType": "ADMIN"
    };
    let params = new HttpParams();
    params = params.append('type', type);
    this.appHttp.post(API_CONFIG.DASHBOARD_EVENTS, payload).subscribe(res => {
      if (res.data) {
        this.sportsList = res.data.sports;

      }
    });
  }
  onEvent(event) {
    console.log('event', event);
    this.router.navigate(['admin/events/' + event.id], { queryParams: { mode: event.mode } });
  }
}
