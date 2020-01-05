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
  googlePic: any;
  meetingList: Meeting[] = [];
  constructor(private authService: AuthenticationService,
    private router: Router,
    private http: AppHttpClient,
    private loading: LoadingService) { }
  // @HostListener('document:ionBackButton', ['$event'])
  // private async overrideHardwareBackAction($event: any) {
  //   console.log('back pressed');
  //   // await this.modalController.dismiss();
  // }
  ngOnInit() {
    console.log('ngOninit');
    const userInfo: any = this.authService.getUserInfo();
    this.googlePic = userInfo.imageUrl;
    this.http.get('meeting/list').subscribe(res => {
      let _meetingList: Meeting[] = <Meeting[]>res.data || [];
      this.meetingList = _meetingList.map(m => {
        m.isCreatedBy = false;
        m.isMember = false;
        if (m.createdBy.id === userInfo.id)
          m.isCreatedBy = true;

        const isUser = m.members.find(u => u.user.id == userInfo.id);
        if (isUser) {
          m.isMember = true;
        }
        return m;
      });
    })
  }
  meetingClick(meetingType) {
    this.router.navigate(['/meeting/type/' + meetingType]);
  }
  navProfile() {
    console.log('log');
    this.router.navigate(['/user-profile']);

  }
  meetingJoin(m) {
    const userInfo: any = this.authService.getUserInfo();
    const member = {
      meetingId: m.id,
      userId: userInfo.id
    }
    if(!m.isMember){
      m.members.push({user:userInfo})
    }else{
      const memberIndx = m.members.findIndex(m => m.user && m.user.id === userInfo.id);
      m.members.splice(memberIndx, 1);
    }

    m.isMember = !m.isMember;
    this.http.post('meeting/join', member).subscribe(res => {
      console.log('res', res);
    });
  }

}
