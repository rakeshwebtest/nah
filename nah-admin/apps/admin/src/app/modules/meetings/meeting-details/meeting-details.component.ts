import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppHttpClient } from '../../../utils/app-http-client.service';
@Component({
  selector: 'theapp-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss']
})
export class MeetingDetailsComponent implements OnInit {
  imgList = [];
  videoList = [];
  commentsList = [];
  meetingId = 0;
  meeting: any = {};
  constructor(private appHttp: AppHttpClient, private activeRouter: ActivatedRoute) { }

  ngOnInit() {

    this.meetingId = this.activeRouter.snapshot.params.id;
    console.log('meetingId -->', this.meetingId);
    this.imgList = [
      { 'url': '../../../../assets/images/hate.png' },
      { 'url': '../../../../assets/images/hate.png' },
      { 'url': '../../../../assets/images/hate.png' },
      { 'url': '../../../../assets/images/hate.png' }
    ];
    this.videoList = [
      { 'url': 'https://www.youtube.com/embed/gMsOw2urOQU' },
      { 'url': 'https://www.youtube.com/embed/wAr_t2OsEdc' },
      { 'url': 'https://www.youtube.com/embed/oPhKhTI0Lss' },
      { 'url': 'https://www.youtube.com/embed/_xAklPmvnqo' }
    ];
    this.commentsList = [
      { 'url': '../../../../assets/images/default-user.png', 'description': `I think I'll speak in a British accent at my next meeting. It seems to be much more effective.This meeting is naff AF, the IT dude is so salty over the costs of moving his department.This meeting is naff AF, the IT dude is so salty over the costs of moving his department  ` },
      { 'url': '../../../../assets/images/user-1.jpg', 'description': `I think I'll speak in a British accent at my next meeting.` },
      { 'url': '../../../../assets/images/user-2.jpg', 'description': `I think I'll speak in a British accent at my next meeting. It seems to be much more effective.This meeting is naff AF, the IT dude is so salty over the costs of moving his department.This meeting is naff AF, the IT dude is so salty over the costs of moving his department  ` },
      { 'url': '../../../../assets/images/default-user.png', 'description': `I think I'll speak in a British accent at my next meeting. ` }
    ];
    this.getMeetingDetails();
  }

  getMeetingDetails() {
    const payload: any = { id: this.meetingId };
    this.appHttp.get('meeting/list?meetingId='+this.meetingId).subscribe(res => {
      if(res.data) {
        this.meeting = res.data;
      }
    });
  }
  deleteComment(id) {
    this.appHttp.delete('meeting/comment'+id).subscribe(res => {
      if(res.data) {
        this.getMeetingDetails();
      }
    });
  }


}
