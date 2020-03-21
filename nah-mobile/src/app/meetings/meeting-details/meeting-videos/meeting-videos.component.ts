import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AppHttpClient } from 'src/app/utils';
import { ModalController } from '@ionic/angular';
import { MeetingAddVideoPopupComponent } from './meeting-add-video-popup/meeting-add-video-popup.component';

@Component({
  selector: 'app-meeting-videos',
  templateUrl: './meeting-videos.component.html',
  styleUrls: ['./meeting-videos.component.scss'],
})
export class MeetingVideosComponent implements OnInit {

  @Input() videos: any[] = [];
  @Input() meetingId: number;
  videoPaths = [];
  modelVideoPath: any;
  trustedVideoUrl: SafeResourceUrl;
  showForm = false;
  constructor(private http: AppHttpClient,
    private modalController: ModalController,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.videoPaths = this.videos.map(video => {
      // video.videoPath = this.selfUrl(video);
      return this.selfUrl(video);
    });
  }

  addVideo(vPath) {
    this.http.post('meeting/video', { meetingId: this.meetingId, videoPath: vPath }).subscribe(res => {
      console.log('res', res);
      this.videoPaths.unshift(this.selfUrl(res.data));
      this.modelVideoPath = null;
    });
  }
  selfUrl(video: any) {
    video.selfPath = this.domSanitizer.bypassSecurityTrustResourceUrl(video.videoPath);
    return video;
  }

  async addVideoBtn() {
    const modal = await this.modalController.create({
      component: MeetingAddVideoPopupComponent,
      componentProps: {
        meetingId: this.meetingId
      },
      cssClass: 'group-create-modal2'
    });
    modal.onDidDismiss().then(arg => {
      if (arg.data) {
        this.videoPaths.unshift(this.selfUrl(arg.data));
      }
    });
    return await modal.present();
  }
}
