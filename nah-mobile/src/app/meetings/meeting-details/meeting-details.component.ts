import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppHttpClient } from 'src/app/utils';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from './../meeting';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss'],
})
export class MeetingDetailsComponent implements OnInit {
  title = 'Meeting Details';
  imgList = [];
  googlePic: any;
  meeting: Meeting;
  constructor(private authService: AuthenticationService, private router: ActivatedRoute, private http: AppHttpClient) { }

  ngOnInit() {
    
    const userInfo: any = this.authService.isAuthenticated();
    this.googlePic = userInfo.user.imageUrl;
    this.imgList = [
      { 'url': 'assets/images/default-user.png' },
      { 'url': 'assets/images/user-1.jpg' },
      { 'url': 'assets/images/user-2.jpg' },
      { 'url': 'assets/images/user-1.jpg' },
      { 'url': 'assets/images/default-user.png' },
      { 'url': 'assets/images/user-2.jpg' }
    ];
    const meetingId = this.router.snapshot.params.id;
    this.http.get('meeting/list?meetingId=' + meetingId).subscribe(res => {
        if(res.data){
          this.meeting = res.data;
        }
    });
  }

}
