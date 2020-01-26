import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  group:any = {
    name: '',
    followers: [],
    meetings: [],
    id:null
  };
  followersList = [];
  meetingsList = [];
  activeTab = 'meetings';
  customColors = ['#f00', '#0f0', '#00f', '#800000', '#6b8e23', '#6050dc', '#2d4436', '#003480', '#351d63', '#000000'];
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
