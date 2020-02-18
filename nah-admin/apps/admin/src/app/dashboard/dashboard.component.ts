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
  barData: any;
  pieData: any;
  cityWiseUsersData: any;
  cityWiseUsersOptions: any;
  cityWiseMeetingsData: any;
  cityWiseMeetingsOptions: any;

  constructor(private router: Router, private appHttp: AppHttpClient) { }

  ngOnInit() {
    // this.getCityWiseUsersData();  
    // this.getCityWiseMeetingsData();
    this.getCityData();
  }
  getCityData() {
    this.cityWiseUsersOptions = {
      title: {
        display: true,
        text: 'City Vs Users',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
    this.cityWiseMeetingsOptions = {
      title: {
        display: true,
        text: 'City Vs Meetings',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
    this.appHttp.get('city/info').subscribe(res => {
      if (res.data) {
        const userCities: any = [];
        const meetingCities: any = [];
        const users: any = [];
        const meetings: any = [];
        res.data.forEach(city => {
          if (city.usersCount > 0) {
            userCities.push(city.name);
            users.push(city.usersCount);
            meetings.push(city.meetingsCount);
          }

          if (city.meetingsCount > 0) {
            meetingCities.push(city.name);
            meetings.push(city.meetingsCount);
          }

        });
        this.cityWiseUsersData = {
          labels: userCities,
          datasets: [
            {
              data: users,
              backgroundColor: [
                '#f00', '#0f0', '#00f', '#800000', '#6b8e23', '#6050dc', '#2d4436', '#003480', '#351d63', '#000000', '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324'
              ]
            }]
        };
        this.cityWiseMeetingsData = {
          labels: meetingCities,
          datasets: [
            {
              data: meetings,
              backgroundColor: [
                '#f00', '#0f0', '#00f', '#800000', '#6b8e23', '#6050dc', '#2d4436', '#003480', '#351d63', '#000000', '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324'
              ]
            }]
        };
      }
    });
  }
  getCityWiseUsersData() {
    this.cityWiseUsersOptions = {
      title: {
        display: true,
        text: 'City Vs Users',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
    this.cityWiseUsersData = {
      labels: ['New York', 'Los Angeles', 'Chicago'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
  }
  getCityWiseMeetingsData() {
    this.cityWiseMeetingsOptions = {
      title: {
        display: true,
        text: 'City Vs Meetings',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
    this.cityWiseMeetingsData = {
      labels: ['New York', 'Los Angeles', 'Chicago'],
      datasets: [
        {
          data: [100, 150, 80],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
  }
}
