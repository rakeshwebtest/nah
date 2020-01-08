import { Component, OnInit, HostListener } from '@angular/core';
import { UserConfigService } from '../utils/user-config.service';
import { LoadingService } from '../utils/loading.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Meeting } from '../meetings/meeting';
import { AppHttpClient } from '../utils';

@Component({
  selector: 'theapp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  googlePic: string;
  constructor(private authService: AuthenticationService,
    private router: Router) { }
  // @HostListener('document:ionBackButton', ['$event'])
  // private async overrideHardwareBackAction($event: any) {
  //   console.log('back pressed');
  //   // await this.modalController.dismiss();
  // }
  ngOnInit() {
    const userInfo: any = this.authService.isAuthenticated();
    this.googlePic = userInfo.user.imageUrl;
    console.log('ngOninit');

  }
  meetingClick(meetingType) {
    this.router.navigate(['/meeting/type/' + meetingType]);
  }
  navProfile() {
    console.log('log');
    this.router.navigate(['/user-profile']);
  }
}
