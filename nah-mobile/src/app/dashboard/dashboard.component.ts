import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MeetingListService } from '../shared/meeting-list/meeting-list.service';
import { AgendaService } from '../agenda/agenda.service';


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
  userInfo: any;
  constructor(private authService: AuthenticationService,
    private ms: MeetingListService,
    private activeRouter: ActivatedRoute,
    private agendaService: AgendaService,
    private router: Router) {

  }
  // @HostListener('document:ionBackButton', ['$event'])
  // private async overrideHardwareBackAction($event: any) {
  //   console.log('back pressed');
  //   // await this.modalController.dismiss();
  // }
  ionViewDidEnter() {
    this.userInfo = this.authService.getUserInfo();
    this.googlePic = this.userInfo.imageUrl;
    if (this.firstTimeEnter) {
      this.ms.meetingReload();
    }
    this.firstTimeEnter = true;
    this.agendaService.checkAgenda();
  }
  ngOnInit() {
    this.authService.checkUser().then(res => {
      this.userInfo = res;
      this.googlePic = this.userInfo.user.imageUrl;
    });
  }
  meetingClick(meetingType) {
    this.router.navigate(['/meeting/type/' + meetingType]);
  }
  navProfile() {
    this.router.navigate(['/user-profile/' + this.userInfo.id]);
  }
}
