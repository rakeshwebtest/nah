import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { AppHttpClient } from '../utils';
import { AuthenticationService } from '../services/authentication.service';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { GroupCreateModalComponent } from '../group-create-modal/group-create-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupListComponent } from '../shared/group-list/group-list.component';
import { UserListComponent } from '../shared/user-list/user-list.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  googlePic: String;
  userInfo: any;
  groupList = [];
  activeTab = "all";
  rating = 1;
  points = 100;
  showLoading = false;
  isOtherProfile = false;
  sessionUser: any;
  profileId: any;
  @ViewChild(GroupListComponent, { static: false }) groupC: GroupListComponent;
  @ViewChild(UserListComponent, { static: false }) userFollowing: UserListComponent;
  @ViewChild(UserListComponent, { static: false }) userFollowers: UserListComponent;
  @ViewChild(UserListComponent, { static: false }) userBlocked: UserListComponent;
  customColors = ['#f00', '#0f0', '#00f', '#800000', '#6b8e23', '#6050dc', '#2d4436', '#003480', '#351d63', '#000000'];
  showTab = false;
  constructor(
    private authService: AuthenticationService,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private http: AppHttpClient) { }
  ionViewWillEnter() {
    console.log('reload profile');
    this.showTab = false;
    setTimeout(() => {
      this.showTab = true;
    }, 300);
  }
  ngOnInit() {
    const userInfo: any = this.authService.isAuthenticated();
    this.sessionUser = userInfo.user;
    this.isOtherProfile = (this.activeRouter.snapshot.params.id && this.activeRouter.snapshot.params.id != this.sessionUser.id) ? true : false;
    this.profileId = this.activeRouter.snapshot.params.id || this.sessionUser.id;
    this.getUserRating();
  }
  getUserRating() {
    const profileId = this.activeRouter.snapshot.params.id || this.sessionUser.id;
    const url = 'user/' + profileId;
    this.showLoading = true;
    this.http.get(url).subscribe(res => {
      this.userInfo = res.data;
      if (res.data && res.data.score) {
        this.points = res.data.score;
      }
      this.googlePic = res.data.imageUrl;
      this.getRating();
      this.showLoading = false;
    });
  }
  following() {
    this.http.post('user/follow', { followingId: this.activeRouter.snapshot.params.id }).subscribe(res => {
      this.userInfo.following = res;
    });
  }
  unfollowing() {
    this.http.post('user/unfollow', { followingId: this.activeRouter.snapshot.params.id }).subscribe(res => {
      this.userInfo.following = null;
    });
  }
  block() {
    this.http.post('user/profileBlock', { userId: this.activeRouter.snapshot.params.id }).subscribe(res => {
      this.userInfo.blocked = res;
    });
  }
  unblock() {
    this.http.post('user/profileUnblock', { userId: this.activeRouter.snapshot.params.id }).subscribe(res => {
      this.userInfo.blocked = null;
    });
  }
  getRating() {
    if (this.points < 250) {
      this.rating = 1;
    } else if (this.points < 600) {
      this.rating = 2;
    } else if (this.points < 1300) {
      this.rating = 3;
    } else if (this.points < 3000) {
      this.rating = 4;
    } else {
      this.rating = 5;
    }
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

  async presentModal() {
    console.log('0k');
    const modal = await this.modalController.create({
      component: GroupCreateModalComponent,
      cssClass: 'group-create-modal'
    });
    modal.onDidDismiss().then(arg => {
      // this.getGroups();
      this.getUserRating();
      console.log('arg', arg);
      if (arg.data)
        this.groupC.ngOnInit();
    });
    return await modal.present();
  }



  navGroupList() {
    this.router.navigate(['/group/list']);
  }
}
