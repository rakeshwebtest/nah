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
  constructor(private authService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    const userInfo: any = this.authService.isAuthenticated();
    this.googlePic = userInfo.user.imageUrl;
    const params = this.route.snapshot.params;
    this.title = params.type;
    switch (params.type) {
      case 'my-meeting':
        this.title = "My Meetings";
        break;
      case 'upcoming':
        this.title = "Upcoming Meetings";
        break;
      default:
        this.title = "All Meetings";
        break;
    }
  }

}
