import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppHttpClient } from 'src/app/utils';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from './../meeting';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss'],
})
export class MeetingDetailsComponent implements OnInit {
  title = 'Meeting Details';
  imgList = [];
  googlePic: any;
  meeting: Meeting;
  commentMsg: string;
  form = new FormGroup({});
  imageModel = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'images',
      type: 'file',
      wrappers: ['vertical'],
      className: 'col-12',
      templateOptions: {
        multiple:true,
        required: true,
        label: 'Image',
        placeholder: 'Upload Image',
      }
    }

  ];
  constructor(private authService: AuthenticationService, private router: ActivatedRoute, private http: AppHttpClient) { }

  ngOnInit() {

    const userInfo: any = this.authService.getUserInfo();
    this.googlePic = userInfo.imageUrl;
    this.imgList = [
      { 'url': 'assets/images/default-user.png' },
      { 'url': 'assets/images/user-1.jpg' },
      { 'url': 'assets/images/user-2.jpg' },
      { 'url': 'assets/images/user-1.jpg' },
      { 'url': 'assets/images/default-user.png' },
      { 'url': 'assets/images/user-2.jpg' }
    ];
    const meetingId = this.router.snapshot.params.id;
    this.http.get('meeting/list?meetingId=' + meetingId).subscribe(res => {
      if (res.data) {
        this.meeting = res.data;
      }
    });
  }
  addComment(comment) {

    const meetingId = this.router.snapshot.params.id;
    const userInfo: any = this.authService.getUserInfo();
    const payLoad = {
      comment: comment,
      meetingId: meetingId,
      userId: userInfo.id
    }
    // this.meeting.comments.push();
    this.http.post('meeting/comment', payLoad).subscribe(res => {
      if (res.data) {
        const _comment = res.data;
        _comment.createdBy = userInfo;
        this.meeting.comments.unshift(_comment);
        this.commentMsg = null;
      }
    });
  }
  uploadImages() {
    const formData = new FormData();
    // for (let key in this.imageModel) {
    //   formData.append(key, this.imageModel[key]);
    // }
    // console.log('files',this.imageModel);
    const files:any[] = this.imageModel['images'];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      formData.append('images[]', file);
      
    }



    this.http.post('meeting/images', formData).subscribe(res => {
      console.log('res',res);
      if (res.data) {
       
      }
    });


  }

}
