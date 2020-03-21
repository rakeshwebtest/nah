import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { AppHttpClient } from 'src/app/utils';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-meeting-add-video-popup',
  templateUrl: './meeting-add-video-popup.component.html',
  styleUrls: ['./meeting-add-video-popup.component.scss'],
})
export class MeetingAddVideoPopupComponent implements OnInit {
  @Input() meetingId:any;
  title = "Add Video";
  modelVideoPath: any;
  trustedVideoUrl: SafeResourceUrl;
  constructor(private modalCtrl: ModalController,private http: AppHttpClient) { }

  ngOnInit() {}
  addVideo(vPath) {
    let embedPath = 'https://www.youtube.com/embed/'+vPath;
    this.http.post('meeting/video', { meetingId: this.meetingId, videoPath: embedPath }).subscribe(res => {
      this.modelVideoPath = null;
      this.dismiss(res)
    });
  }
  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss(data);
  }


}
