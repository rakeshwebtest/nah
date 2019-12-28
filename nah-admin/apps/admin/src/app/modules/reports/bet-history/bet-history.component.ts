import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'theapp-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.scss']
})
export class BetHistoryComponent implements OnInit {
  public cols = [];
  public historyList = [];

  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: 'userId', header: 'User Id' },
      { field: 'userName', header: 'User Name' },
      { field: 'userType', header: 'User Type' },
      { field: 'maxProfitMatch', header: 'Max Profit Match' },
      { field: 'maxProfitFancy', header: 'Max Profit Fancy' },
      { field: 'agentId', header: 'Agent Id' },
    ];
    this.historyList = [
      {
        "userId": "1",
        "userName": "Super User1",
        "userType": "SUPERUSER",
        "password": null,
        "mobileNumber": "9885684220",
        "emailId": "superuser@gmail.com",
        "maxProfitMatch": 1000,
        "maxProfitFancy": 1000,
        "agentId": "",
        "updatedBy": "1",
        "active": true
      },
      {
        "userId": "admin1",
        "userName": "Admin 1",
        "userType": "ADMIN",
        "password": null,
        "mobileNumber": "9885684220",
        "emailId": "admin1@gmail.com",
        "maxProfitMatch": 100,
        "maxProfitFancy": 100,
        "agentId": "1",
        "updatedBy": "1",
        "active": true
      },
      {
        "userId": "11",
        "userName": "11",
        "userType": "ADMIN",
        "password": null,
        "mobileNumber": "99",
        "emailId": null,
        "maxProfitMatch": 100,
        "maxProfitFancy": 100,
        "agentId": "1",
        "updatedBy": "1",
        "active": true
      },
      {
        "userId": "agent01",
        "userName": "Agent 01",
        "userType": "AGENT",
        "password": null,
        "mobileNumber": "9885684220",
        "emailId": null,
        "maxProfitMatch": 50,
        "maxProfitFancy": 50,
        "agentId": "admin1",
        "updatedBy": "admin1",
        "active": true
      },
      {
        "userId": "user01",
        "userName": "User 1",
        "userType": "USER",
        "password": null,
        "mobileNumber": "9885684220",
        "emailId": "user01@gmail.com",
        "maxProfitMatch": 25,
        "maxProfitFancy": 25,
        "agentId": "agent01",
        "updatedBy": "agent01",
        "active": true
      }
    ]
  }

}
