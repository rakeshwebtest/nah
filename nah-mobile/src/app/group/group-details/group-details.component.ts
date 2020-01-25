import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  group = {
    name: '',
    followers: [],
    meetings: []
  };
  followersList = [];
  meetingsList = [];
  activeTab = 'followers';
  customColors = ['#f00', '#0f0', '#00f', '#70C149', '#E6B211', '#EE5641', '#ED008C', '#40B4D9', '#9A6AB6', '#AE8C4C'];
  constructor(private storage: Storage) { }

  ngOnInit() {

    this.storage.get('groupDetails').then(res => {
        this.group = res;
        this.followersList = this.group.followers;
        this.meetingsList = this.group.meetings;
        // console.log('this.followersList', this.followersList[0].name);
    });
  }

}
