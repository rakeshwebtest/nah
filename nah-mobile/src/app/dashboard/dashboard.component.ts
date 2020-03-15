import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MeetingListService } from '../shared/meeting-list/meeting-list.service';


@Component({
  selector: 'theapp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  googlePic: string;
  showList = false;
  activeTab = 'type/all';
  firstTimeEnter = false;
  constructor(private authService: AuthenticationService,
    private ms: MeetingListService,
    private activeRouter:ActivatedRoute,
    private router: Router) { }
  // @HostListener('document:ionBackButton', ['$event'])
  // private async overrideHardwareBackAction($event: any) {
  //   console.log('back pressed');
  //   // await this.modalController.dismiss();
  // }
  ionViewWillEnter() {
    const userInfo: any = this.authService.getUserInfo();
    this.googlePic = userInfo.imageUrl;
    if (this.firstTimeEnter)
      this.ms.meetingReload();
    this.firstTimeEnter = true;
    this.activeTab = 'type'+'/'+this.activeRouter.snapshot.children[0].params.type;
    console.log('this.activeTab',this.activeTab);
    console.log('this.activeRouter.snapshot.params',this.activeRouter.snapshot);
  }
  ngOnInit() {
    console.log('this.activeRouter.snapshot.params',this.activeRouter.snapshot.params);
    const userInfo: any = this.authService.isAuthenticated();
    this.googlePic = userInfo.user.imageUrl;
  }
  meetingClick(meetingType) {
    this.router.navigate(['/meeting/type/' + meetingType]);
  }
  navProfile() {
    this.router.navigate(['/user-profile']);
  }
}
