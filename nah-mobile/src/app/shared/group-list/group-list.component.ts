import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
  @Input() type: 'mygroups' | 'all';
  googlePic: String;
  userInfo: any;
  groupList = [];
  customColors = ['#f00', '#0f0', '#00f', '#800000', '#6b8e23', '#6050dc', '#2d4436', '#003480', '#351d63', '#000000'];

  constructor(private alertCtrl: AlertController,
    private authService: AuthenticationService,
    private router: Router,
    private storage: Storage,
    private http: AppHttpClient) { }

  ngOnInit() {
    const userInfo: any = this.authService.isAuthenticated();
    this.userInfo = userInfo.user;
    this.getGroups();
  }
  getGroups() {
    let url = 'group/list';
    if (this.type === 'mygroups') {
      url += '/'+this.userInfo.id;
    } 

    this.http.get(url).subscribe(res => {
      console.log('list gro', res);
      const _groupList = res.data || [];
      _groupList.map(item => {
        if (item.followers.length > 0) {
          const isFollower = item.followers.find(f => f.user && f.user.id === this.userInfo.id);
          item.textColor = this.getRandomColor();
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
  addGroup(group){
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
    this.storage.set('groupDetails',g).then(res=>{
      this.router.navigate(['/group/details/' + g.id]);
    });
 
  }
}
