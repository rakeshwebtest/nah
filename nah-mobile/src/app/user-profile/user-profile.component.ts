import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AppHttpClient } from '../utils';
import { AuthenticationService } from '../services/authentication.service';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  googlePic: String;
  userInfo: any;
  groupList = [];
  constructor(private authService: AuthenticationService,
    private popoverController: PopoverController,
    private http: AppHttpClient) { }

  ngOnInit() {
    const userInfo: any = this.authService.isAuthenticated();
    this.userInfo = userInfo.user;
    this.googlePic = userInfo.user.imageUrl;
    console.log('this.userInfo', userInfo);
    this.getGroups();
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverMenuComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }
  getGroups() {
    this.http.get('group/list').subscribe(res => {
      console.log('list gro', res);
      this.groupList = res.data || [];
    });
  }
  
}
