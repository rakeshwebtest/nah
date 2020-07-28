import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppHttpClient } from 'src/app/utils';
import { LoadingService } from 'src/app/utils/loading.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Meeting } from 'src/app/meetings/meeting';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { MeetingListService } from './meeting-list.service';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent implements OnInit, OnDestroy {
  googlePic: any;
  meetingList: any = [];
  showMeetingMsg = false;
  showLoading = false;
  @Input() noMeetingMsg = 'Hmm, seems like they are no meetings.'
  @Input() type = 'all';
  @Input() groupId: any;
  @Input() userId: any;
  take = 20;
  msSubscription: Subscription;
  constructor(private authService: AuthenticationService,
    private storage: Storage,
    private router: Router,
    private alertCtrl: AlertController,
    private activeRouter: ActivatedRoute,
    private http: AppHttpClient,
    private ms: MeetingListService,
    private loading: LoadingService) {
    this.msSubscription = this.ms.getChanges().subscribe(message => {
      if (message) {
        this.getMeetings(null, true);
      }
    });
  }

  ngOnInit() {
    this.meetingList = [];
    this.getMeetings(null, true);
  }
  getMeetings(infiniteScroll?: any, reload?: any) {
    if (reload) {
      this.meetingList = [];
    }
    console.log('reload', reload);
    
    const params = this.activeRouter.snapshot.params;
    const userInfo: any = this.authService.getUserInfo();
    const _userId = this.userId || userInfo.id;
    this.googlePic = userInfo.imageUrl;
    let queryString = '?type=' + this.type;
    queryString += '&userId=' + _userId;
    if (this.groupId)
      queryString += '&groupId=' + this.groupId;
    // if (params.type === 'my-meeting') {
    //   queryString += '&userId=' + userInfo.id;
    // }
    queryString += '&skip=' + this.meetingList.length;
    queryString += '&take=' + this.take;
    this.showLoading = true;

    this.http.get('meeting/list' + queryString).pipe(map(res => {
      let _meetingList: Meeting[] = <Meeting[]>res.data || [];
      _meetingList.map(m => {
        m.isCreatedBy = false;
        m.isSuspend = false;
        m.isMember = false;
        if (m.createdBy.id === userInfo.id)
          m.isCreatedBy = true;

        if (m.group.isDeleted == 1)
          m.isSuspend = true;

        const d1 = new Date(m.endDate);
        const time = new Date(m.endTime);
        d1.setHours(time.getHours());
        d1.setMinutes(time.getMinutes());
        const today = new Date();
        if (d1.getTime() < today.getTime()) {
          m.isCompleted = true;
        } else {
          m.isCompleted = false;
        }

        const isUser = m.members.find(u => u.user.id == userInfo.id);
        if (isUser) {
          m.isMember = true;
        }
        return m;
      });



      return _meetingList;
    })).subscribe(res => {
      this.showLoading = false;
      this.meetingList = [...this.meetingList, ...res];
      if (infiniteScroll) {
        infiniteScroll.target.complete();
        // if(_meetingList.length === 0){
        //   infiniteScroll.complete();
        // }

      }


      if (reload && reload.target) {
        reload.target.complete();
        reload.target.disabled = false;
      }


      if (this.meetingList.length == 0) {
        this.showMeetingMsg = true;
      } else {
        this.showMeetingMsg = false;
      }
    });
  }
  meetingJoin(m) {
    const userInfo: any = this.authService.getUserInfo();
    const member = {
      meetingId: m.id,
      userId: userInfo.id
    }
    if (!m.isMember) {
      m.members.push({ user: userInfo })
    } else {
      const memberIndx = m.members.findIndex(m => m.user && m.user.id === userInfo.id);
      m.members.splice(memberIndx, 1);
    }

    m.isMember = !m.isMember;
    this.http.post('meeting/join', member).subscribe(res => {
      console.log('res', res);
    });
  }
  clickMeeting(meeting) {
    this.router.navigate(['/meeting/details/' + meeting.id]);
  }
  reloadItems(eve) {
    console.log('eve', eve);
  }
  async doRefresh(event) {
    this.getMeetings(null, event);
  }

  async deleteMeetingConfirm(meeting: any, index) {
    let alert = await this.alertCtrl.create({
      message: 'Do you want to delete this Meeting?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.deleteMeeting(meeting, index);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteMeeting(meeting: any, index) {
    this.meetingList.splice(index, 1);
    this.http.delete('meeting/' + meeting.id).subscribe(res => {
      // this.meetingList.splice(index, 1);
    });

  }
  gotoGroupPage(group) {
    this.router.navigate(['/group/details/' + group.id]);
  }
  ngOnDestroy() {
    this.msSubscription.unsubscribe();
  }


}
