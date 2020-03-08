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
  categoryWiseReportOptions = {
    title: {
      display: true,
      text: 'Category Vs Concerns',
      fontSize: 16
    },
    legend: {
      position: 'bottom'
    }
  };
  categoryWiseReportData: any;
  constructor(private router: Router, private appHttp: AppHttpClient) { }

  ngOnInit() {
    this.getCityData();
    this.getReportData();
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
            userCities.push(city.name + ' (' + city.usersCount + ')');
            users.push(city.usersCount);
          }

          if (city.meetingsCount > 0) {
            meetingCities.push(city.name + ' (' + city.meetingsCount + ')');
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
  getReportData() {

    this.appHttp.get('meeting/report/category/info').subscribe(res => {
      if (res.data) {
        const categories: any = [];
        const reports: any = [];
        res.data.forEach(category => {
          if (category.reportCount > 0) {
            categories.push(category.name + ' (' + category.reportCount + ')');
            reports.push(category.reportCount);
          }


        });

        this.categoryWiseReportData = {
          labels: categories,
          datasets: [
            {
              data: reports,
              backgroundColor: [
                '#f00', '#0f0', '#00f', '#800000', '#6b8e23', '#6050dc', '#2d4436', '#003480', '#351d63', '#000000', '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324'
              ]
            }]
        };
      }
    });

  }
}
