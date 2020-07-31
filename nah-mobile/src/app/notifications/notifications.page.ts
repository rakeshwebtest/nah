import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  userInfo: any;
  constructor(private userAuth: AuthenticationService) { }

  ngOnInit() {
    this.userInfo = this.userAuth.getUserInfo();
  }

}
