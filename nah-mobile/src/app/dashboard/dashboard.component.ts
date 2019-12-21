import { Component, OnInit } from '@angular/core';
import { UserConfigService } from '../utils/user-config.service';
import { LoadingService } from '../utils/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'theapp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  googlePic: any;
  constructor(private userConfigService: UserConfigService,
    private router: Router,
    private loading: LoadingService) { }

  ngOnInit() {
    this.googlePic = this.userConfigService.user.user.imageUrl;
  }
  groupClick(item) {

  }
  navProfile() {
    console.log('log');
    this.router.navigate(['/user-profile']);

  }

}
