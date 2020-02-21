import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.page.html',
  styleUrls: ['./meetings.page.scss'],
})
export class MeetingsPage implements OnInit {
  googlePic: any;
  title: any;
  noMeetingMsg: string;
  params = this.route.snapshot.params;
  constructor(private authService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    const userInfo: any = this.authService.isAuthenticated();
    this.googlePic = userInfo.user.imageUrl;

    this.title = this.params.type;
    switch (this.params.type) {
      case 'my-meeting':
        this.title = "My Meetings";
        this.noMeetingMsg = "You don't have any meetings right at this moment";
        break;
      case 'upcoming':
        this.title = "Upcoming Meetings";
        this.noMeetingMsg = "You don't have any scheduled meetings";
        break;
      default:
        this.title = "All Meetings";
        this.noMeetingMsg = "Hmm, seems like they are no meetings";
        break;
    }
  }

}
