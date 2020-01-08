import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppHttpClient } from 'src/app/utils';
import { LoadingService } from 'src/app/utils/loading.service';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/meetings/meeting';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent implements OnInit, OnDestroy {
  googlePic: any;
  meetingList: Meeting[] = [];
  constructor(private authService: AuthenticationService,
    private router: Router,
    private http: AppHttpClient,
    private loading: LoadingService) { }

  ngOnInit() {

    this.getMeetings().subscribe(res => {
      this.meetingList = res;
    });

  }
  getMeetings(): Observable<Meeting[]> {
    const userInfo: any = this.authService.getUserInfo();
    this.googlePic = userInfo.imageUrl;
    return this.http.get('meeting/list').pipe(map(res => {
      let _meetingList: Meeting[] = <Meeting[]>res.data || [];
      _meetingList.map(m => {
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
      console.log('dow');
      return _meetingList;
    }));
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
    this.getMeetings().subscribe(res => {
      this.meetingList = res;
      event.target.complete();
    });

  }
  ngOnDestroy() {

  }


}
