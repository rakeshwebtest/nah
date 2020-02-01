import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppHttpClient } from 'src/app/utils';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from './../meeting';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PopoverController } from '@ionic/angular';
import { MeetingDetailsActionsComponent } from './meeting-details-actions/meeting-details-actions.component';

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
  imageModel: any = {};
  activeTab: string = 'images';

  fields: FormlyFieldConfig[] = [
    {
      key: 'images',
      type: 'file',
      wrappers: ['vertical'],
      className: 'col-12',
      templateOptions: {
        multiple: true,
        required: false,
        label: '',
        placeholder: 'Upload Image',
      }
    }

  ];
  constructor(private authService: AuthenticationService,
    private popoverController: PopoverController,
    private router: ActivatedRoute, private http: AppHttpClient) { }

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
    this.form.valueChanges.subscribe(res => {
      console.log('value changes', this.imageModel);
      if (this.imageModel.images) {
        this.uploadImages();
      };
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
    const files: any[] = this.imageModel['images'];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      formData.append('images[]', file);

    }



    this.http.post('meeting/images/' + this.meeting.id, formData).subscribe(res => {
      if (res.data) {
        this.imageModel = {};
        this.form.reset();
        this.meeting.photos.push(...res.data);
      }
    });


  }
  publishMeeting(m: Meeting) {
    this.meeting.isPublished = 1;
    this.http.get('meeting/publish/' + m.id).subscribe(res => {

    });

  }

  async actionMenu(ev: any) {
    const popover = await this.popoverController.create({
      component: MeetingDetailsActionsComponent,
      componentProps: {
        meetingId: this.meeting.id
      },
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

}
