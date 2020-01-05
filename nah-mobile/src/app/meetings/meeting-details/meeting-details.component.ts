import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss'],
})
export class MeetingDetailsComponent implements OnInit {
  title = 'Meeting Details';
  imgList = [];
  googlePic: any;
  constructor(private authService: AuthenticationService) { }

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
  }

}
