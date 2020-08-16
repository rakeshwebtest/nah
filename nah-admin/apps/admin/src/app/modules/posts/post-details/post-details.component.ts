import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppHttpClient } from '../../../utils/app-http-client.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'theapp-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  providers: [ConfirmationService]
})
export class PostDetailsComponent implements OnInit {
  imgList = [];
  videoList = [];
  commentsList = [];
  meetingId = 0;
  meeting: any = {};
  constructor(private appHttp: AppHttpClient, 
    private activeRouter: ActivatedRoute,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.meetingId = this.activeRouter.snapshot.params.id;
    console.log('meetingId -->', this.meetingId);
    this.imgList = [     
    ];
    this.videoList = [    
    ];
    this.commentsList = [
      
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
  deleteImage(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.appHttp.delete('meeting/photo/'+id).subscribe(res => {
          //if(res.data) {
            this.getMeetingDetails();
          // }
        });
      }
    })
  }
  deleteVideo(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.appHttp.delete('meeting/video/'+id).subscribe(res => {
          //if(res.data) {
            this.getMeetingDetails();
          // }
        });
      }
    })
  }
  deleteComment(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.appHttp.delete('meeting/comment/'+id).subscribe(res => {
          // if(res.data) {
            this.getMeetingDetails();
          // }
        });
      }
    })
  }
  // confirm(id) {
  //   this.confirmationService.confirm({
  //       message: 'Are you sure that you want to perform this action?',
  //       accept: () => {
  //           this.deleteComment(id);
  //       }
  //   });
  // }

}
