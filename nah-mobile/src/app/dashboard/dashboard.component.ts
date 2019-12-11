import { Component, OnInit } from '@angular/core';
import { UserConfigService } from '../utils/user-config.service';

@Component({
  selector: 'theapp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  googlePic: any;
  constructor(private userConfigService: UserConfigService) { }

  ngOnInit() {
    this.googlePic = this.userConfigService.user.user.imageUrl;
  }

}
