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

  cities = [];
  info: any = {
    usersCount: 0,
    activeUsersCount: 0,
    blockedUsersCount: 0,
    groupsCount: 0,
    meetingsCount: 0,
    postsCount: 0
  };
  selectedCity: any = null;
  constructor(private router: Router, private appHttp: AppHttpClient) { }

  ngOnInit() {
    this.getCities();
    this.cities = [
    ];
  }

  getCityData(event) {
    console.log('selected city -->', event);
    if (event.value) {
      const currentCityInfo = event.value;
      this.info.usersCount = currentCityInfo.usersCount;
      this.info.activeUsersCount = currentCityInfo.usersCount;
      this.info.meetingsCount = currentCityInfo.meetingsCount;
      if (currentCityInfo.usersCount > 0) {
        if (currentCityInfo.usersCount < 5) {
          this.info.groupsCount = Math.floor((Math.random() * 5) + 1);
          this.info.postsCount = Math.floor((Math.random() * 5) + 1);
        } else {
          this.info.groupsCount = Math.floor((Math.random() * 10) + 1);
          this.info.postsCount = Math.floor((Math.random() * 10) + 1);
        }
      } else {
        this.info.groupsCount = 0;
        this.info.postsCount = 0;
      }
    } else {
      this.info = {
        usersCount: 0,
        activeUsersCount: 0,
        blockedUsersCount: 0,
        groupsCount: 0,
        meetingsCount: 0,
        postsCount: 0
      }
    }
  }

  getCities() {
    this.appHttp.get('city/list').subscribe(res => {
      if (res.data) {
        this.cities = res.data;
        // res.data.forEach(category => {
        // });
      }
    });
  }
}
