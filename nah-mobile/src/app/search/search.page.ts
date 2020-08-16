import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { PostListComponent } from '../posts/post-list/post-list.component';
import { MeetingListComponent } from '../shared/meeting-list/meeting-list.component';
import { GroupListComponent } from '../shared/group-list/group-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  userInfo: any;
  userId: any;
  searchKey = '';
  @ViewChild(PostListComponent, null) postList: PostListComponent;
  @ViewChild(MeetingListComponent, null) meetingList: MeetingListComponent;
  @ViewChild(GroupListComponent, null) groupList: GroupListComponent;
  constructor(private authS: AuthenticationService) { }

  ngOnInit() {
    this.userInfo = this.authS.getUserInfo();
    this.userId = this.userInfo.id;
  }
  search(event) {
    if (event && event.detail && event.detail.value) {

      this.searchKey = event.detail.value;
      // load posts
      if (this.postList) {
        this.postList.searchKey = this.searchKey;
        this.postList.reload();
      }

      // load meeting
      if (this.meetingList) {
        this.meetingList.searchKey = this.searchKey;
        this.meetingList.reload();
      }
      // load groups
      if (this.groupList) {
        this.groupList.searchKey = this.searchKey;
        this.groupList.reload();
      }

    } else {
      this.searchKey = null;
    }

  }

}
