import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppHttpClient } from 'src/app/utils';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ListSubscribeService } from 'src/app/utils/list-subscribe.service';

@Component({
  selector: 'app-group-details-tab',
  templateUrl: './group-details-tab.component.html',
  styleUrls: ['./group-details-tab.component.scss'],
})
export class GroupDetailsTabComponent implements OnInit {

  group: any = {
    name: '',
    followers: [],
    meetings: [],
    createdBy: {},
    id: null
  };
  followersList = [];
  meetingsList = [];
  activeTab = 'meetings';
  userInfo: any;
  customColors = ['#f00', '#0f0', '#00f', '#800000', '#6b8e23', '#6050dc', '#2d4436', '#003480', '#351d63', '#000000'];
  constructor(private storage: Storage, private http: AppHttpClient, private router: ActivatedRoute,
    private authService: AuthenticationService, private listSubscribe: ListSubscribeService) { }

  ngOnInit() {
    const userInfo: any = this.authService.isAuthenticated();
    this.userInfo = userInfo.user;

    // if (this.group.id != this.router.snapshot.params.id) {
    //   this.getGroupDetails();
    // }
    this.getGroupDetails();

    // this.storage.get('groupDetails').then(res => {
    //   this.group = res;
    //   this.followersList = this.group.followers;
    //   this.meetingsList = this.group.meetings;
    //   // console.log('this.followersList', this.followersList[0].name);

    // });

  }
  getGroupDetails() {
    this.http.get('group/' + this.router.snapshot.params.id).subscribe(res => {
      this.group = res.data;

      if (this.group.followers.length > 0) {
        const isFollower = this.group.followers.find(
          (f) => f.user && f.user.id === this.userInfo.id
        );
        if (isFollower) {
          this.group.isFollower = true;
        }
      }

      console.log('group', this.group);
      this.followersList = this.group.followers;
      this.meetingsList = this.group.meetings;
    });
  }
  follow(item, event) {
    event.stopPropagation();
    item.isFollower = !item.isFollower;
    const payload = {
      groupId: item.id,
      userId: this.userInfo.id,
    };
    if (!item.isFollower) {
      const followerIndx = item.followers.findIndex(
        (f) => f.user && f.user.id === this.userInfo.id
      );
      item.followers.splice(followerIndx, 1);
    } else {
      const followUser = {
        groupId: item.id,
        userId: this.userInfo.id,
        user: this.userInfo,
      };
      item.followers.push(followUser);
    }

    this.http.post("group/follow", payload).subscribe((res) => {
      this.listSubscribe.groupListReload();
    });
  }
}
