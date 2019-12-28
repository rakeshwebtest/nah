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
      const _groupList = res.data || [];
      _groupList.map(item => {
        if (item.followers.length > 0) {
          const isFollower = item.followers.find(f => f.user && f.user.id == this.userInfo.id);

          if (isFollower) {
            item.isFollower = true;
          }
        }
      });
      this.groupList = _groupList;
    });
  }
  follow(item) {
    item.isFollower = !item.isFollower;
    const payload = {
      "groupId": item.id,
      "userId": this.userInfo.id
    };
    if (!item.isFollower) {
      const followerIndx = item.followers.findIndex(f =>f.user && f.user.id == this.userInfo.id);
      item.followers.splice(followerIndx, 1);
    } else {
      const followUser = {
        "groupId": item.id,
        "userId": this.userInfo.id,
        user: this.userInfo
      };
      item.followers.push(followUser);
    }

    this.http.post('group/follow', payload).subscribe(res => {

    });
  }

}