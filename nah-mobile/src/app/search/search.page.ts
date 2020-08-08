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
  searchKey: any;
  @ViewChild(PostListComponent) postList: PostListComponent;
  @ViewChild(MeetingListComponent) meetingList: MeetingListComponent;
  @ViewChild(GroupListComponent) groupList: GroupListComponent;
  constructor(private authS: AuthenticationService) { }

  ngOnInit() {
    this.userInfo = this.authS.getUserInfo();
    this.userId = this.userInfo.id;
  }
  search(event) {
    this.searchKey = event.target.value;
    // load posts
    this.postList.searchKey = event.target.value;
    this.postList.reload();
    // load meeting
    this.meetingList.searchKey = event.target.value;
    this.meetingList.reload();

    // load groups
    this.groupList.searchKey = event.target.value;
    this.groupList.reload();
  }

}
