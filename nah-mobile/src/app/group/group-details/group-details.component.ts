import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppHttpClient } from 'src/app/utils';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  groupId = this.router.snapshot.parent.params.id;
  type = this.router.snapshot.params.type;
  customColors = ['#f00', '#0f0', '#00f', '#800000', '#6b8e23', '#6050dc', '#2d4436', '#003480', '#351d63', '#000000'];
  constructor(private storage: Storage, private http: AppHttpClient, private router: ActivatedRoute) { }

  ngOnInit() {
    // console.log('this.router.snapshot.params.id', this.router.snapshot.params.type, this.router.snapshot.parent.params);

    // if (this.group.id != this.router.snapshot.params.id) {
    //   this.getGroupDetails();
    // }
    // this.getGroupDetails();

    // this.storage.get('groupDetails').then(res => {
    //   this.group = res;
    //   this.followersList = this.group.followers;
    //   this.meetingsList = this.group.meetings;
    //   // console.log('this.followersList', this.followersList[0].name);

    // });

  }
  getGroupDetails() {

    // this.http.get('group/' + this.router.snapshot.params.id).subscribe(res => {
    //   this.group = res.data;
    //   this.followersList = this.group.followers;
    //   this.meetingsList = this.group.meetings;
    // });
  }

}
