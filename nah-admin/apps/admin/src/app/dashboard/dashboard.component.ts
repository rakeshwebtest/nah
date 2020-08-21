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
  info: any = {};
  selectedCity: any = '';
  constructor(private router: Router, private appHttp: AppHttpClient) { }

  ngOnInit() {
    this.getCities();
    this.cities = [      
    ];
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
