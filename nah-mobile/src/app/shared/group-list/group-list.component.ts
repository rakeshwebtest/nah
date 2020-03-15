import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppHttpClient } from 'src/app/utils';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  // @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;

  @Input() type: 'mygroups' | 'all';
  googlePic: String;
  showLoading = false;
  userInfo: any;
  groupList = [];
  customColors = ['#f00', '#0f0', '#00f', '#800000', '#6b8e23', '#6050dc', '#2d4436', '#003480', '#351d63', '#000000'];
  noGroupMsg = false;
  take = 20;
  skip = 0;
  constructor(private alertCtrl: AlertController,
    private authService: AuthenticationService,
    private router: Router,
    private storage: Storage,
    private http: AppHttpClient) { }

  ngOnInit() {
    const userInfo: any = this.authService.isAuthenticated();
    this.userInfo = userInfo.user;
    this.groupList = [];
    this.getGroups();
  }
  getGroups(infiniteScroll?: any) {

    let url = 'group/list?userId=' + this.userInfo.id;
    if (this.type === 'mygroups') {
      url += '&createdBy=true';
    } else {
      url += '&notCreatedBy=true';
    }
    url += '&skip=' + this.groupList.length;
    url += '&take=' + this.take;

    this.showLoading = true;
    this.http.get(url).subscribe(res => {
      const _groupList = res.data || [];
      this.showLoading = false;
      _groupList.map(item => {
        if (item.followers.length > 0) {
          const isFollower = item.followers.find(f => f.user && f.user.id === this.userInfo.id);
          item.textColor = this.getRandomColor();
          if (isFollower) {
            item.isFollower = true;
          }
        }

      });


      this.groupList = [...this.groupList, ..._groupList];

      if (infiniteScroll)
        infiniteScroll.target.complete();

      if (this.groupList.length == 0) {
        this.noGroupMsg = true;
      } else {
        this.noGroupMsg = false;
      }
    });
  }
  follow(item,event) {
    event.stopPropagation();
    item.isFollower = !item.isFollower;
    const payload = {
      groupId: item.id,
      userId: this.userInfo.id
    };
    if (!item.isFollower) {
      const followerIndx = item.followers.findIndex(f => f.user && f.user.id === this.userInfo.id);
      item.followers.splice(followerIndx, 1);
    } else {
      const followUser = {
        groupId: item.id,
        userId: this.userInfo.id,
        user: this.userInfo
      };
      item.followers.push(followUser);
    }

    this.http.post('group/follow', payload).subscribe(res => {

    });
  }

  async deleteGroupConfirm(group: any, index) {
    let alert = await this.alertCtrl.create({
      message: 'Do you want to delete this group?',
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
            this.deleteGroup(group, index);
          }
        }
      ]
    });
    await alert.present();
  }
  addGroup(group) {
    this.groupList.unshift(group);
  }
  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  deleteGroup(group: any, index) {
    this.groupList.splice(index, 1);
    this.http.delete('group/' + group.id).subscribe(res => {

    });

  }
  navGroupDetails(g) {
    console.log('g', g);
    this.storage.set('groupDetails', g).then(res => {
      this.router.navigate(['/group/details/' + g.id]);
    });

  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation', infiniteScroll);
    // infiniteScroll.complete();
    // setTimeout(() => {
    //   for (let i = 0; i < 30; i++) {
    //     this.items.push( this.items.length );
    //   }

    //   console.log('Async operation has ended');
    //   infiniteScroll.complete();
    // }, 500);
  }
  toggleInfiniteScroll() {
    // this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
