import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppHttpClient } from 'src/app/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { Meeting } from './../meeting';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { MeetingDetailsActionsComponent } from './meeting-details-actions/meeting-details-actions.component';
import { map } from 'rxjs/operators';
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
  activeTab = 'images';
  replyMsg: any = {};
  userInfo: any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'images',
      type: 'file',
      wrappers: ['vertical'],
      className: '',
      templateOptions: {
        multiple: true,
        required: false,
        showTempPics: false,
        label: '',
        placeholder: 'Upload Image',
      }
    }

  ];
  constructor(private authService: AuthenticationService,
    private alertCtrl: AlertController,
    private popoverController: PopoverController,
    private router: Router,
    private activeRouter: ActivatedRoute, private http: AppHttpClient) { }

  ngOnInit() {

    this.userInfo = this.authService.getUserInfo();
    this.googlePic = this.userInfo.imageUrl;
    this.imgList = [
      { 'url': 'assets/images/default-user.png' },
      { 'url': 'assets/images/user-1.jpg' },
      { 'url': 'assets/images/user-2.jpg' },
      { 'url': 'assets/images/user-1.jpg' },
      { 'url': 'assets/images/default-user.png' },
      { 'url': 'assets/images/user-2.jpg' }
    ];
    const meetingId = this.activeRouter.snapshot.params.id;
    this.http.get('meeting/list?meetingId=' + meetingId).pipe(map(res => {
      let m: Meeting = <Meeting>res.data;
      m.isCreatedBy = false;
      m.isSuspend = false;
      m.isMember = false;
      if (m.createdBy.id === this.userInfo.id)
        m.isCreatedBy = true;

      if (m.group.isDeleted == 1)
        m.isSuspend = true;

      const d1 = new Date(m.endDate);
      const time = new Date(m.endTime);
      d1.setHours(time.getHours());
      d1.setMinutes(time.getMinutes());
      const today = new Date();
      if (d1.getTime() < today.getTime()) {
        m.isCompleted = true;
      } else {
        m.isCompleted = false;
      }

      const isUser = m.members.find(u => u.user.id == this.userInfo.id);
      if (isUser) {
        m.isMember = true;
      }
      return m;
    })).subscribe(res => {
      if (res) {
        this.meeting = res;
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

    const meetingId = this.activeRouter.snapshot.params.id;
    const userInfo: any = this.authService.getUserInfo();
    let payLoad = {

    }
    if (this.replyMsg.id) {
      payLoad = {
        meetingCommentId: this.replyMsg.id,
        comment: comment,
        userId: userInfo.id
      }
      this.http.post('meeting/comment-reply', payLoad).subscribe(res => {
        if (res.data) {
          const _comment = res.data;
          _comment.createdBy = userInfo;
          this.replyMsg.replys.push(_comment);
          this.commentMsg = null;
        }
        this.replyMsg = {};
      });

    } else {
      payLoad = {
        comment: comment,
        meetingId: meetingId,
        userId: userInfo.id
      }
      this.http.post('meeting/comment', payLoad).subscribe(res => {
        if (res.data) {
          const _comment = res.data;
          _comment.createdBy = userInfo;
          _comment.replys = [];
          this.meeting.comments.unshift(_comment);

          this.commentMsg = null;
        }
      });
    }

    // this.meeting.comments.push();

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
  cancelMeeting(m: Meeting) {
    this.meeting.isCanceled = 1;
    this.http.get('meeting/cancel/' + m.id).subscribe(res => {

    });

  }

  async actionMenu(ev: any) {
    const popover = await this.popoverController.create({
      component: MeetingDetailsActionsComponent,
      componentProps: {
        meetingId: this.meeting.id,
        meeting: this.meeting,
        userInfo: this.userInfo
      },
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }
  replyComment(c) {
    this.replyMsg = c;
  }
  clearReply() {
    this.replyMsg = {};
  }
  async deleteComment(items: any[], inx, reply) {
    let alert = await this.alertCtrl.create({
      message: 'Do you want to delete this Comment?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            const comment = items[inx];
            let _url = 'meeting/comment/';
            if (reply) {
              _url += 'reply/' + comment.id;

            } else {
              _url += comment.id;
            }

            this.http.delete(_url).subscribe(res => {

            });
            items.splice(inx, 1);

          }
        }
      ]
    });
    await alert.present();
  }
  meetingJoin(m) {
    const userInfo: any = this.authService.getUserInfo();
    const member = {
      meetingId: m.id,
      userId: userInfo.id
    }
    if (!m.isMember) {
      m.members.push({ user: userInfo })
    } else {
      const memberIndx = m.members.findIndex(m => m.user && m.user.id === userInfo.id);
      m.members.splice(memberIndx, 1);
    }

    m.isMember = !m.isMember;
    this.http.post('meeting/join', member).subscribe(res => {
      console.log('res', res);
    });
  }
  async deleteImg(photos, inx) {
    let alert = await this.alertCtrl.create({
      message: 'Do you want to delete the image?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            const photo = photos[inx];
            this.http.delete('meeting/photo/' + photo.id).subscribe(res => {
              console.log('res', res);
            });
            photos.splice(inx, 1);

          }
        }
      ]
    });
    await alert.present();
  }
  gotoGroupDetails(group) {
    this.router.navigate(['group/details/' + group.id + '/meetings']);
  }
}
