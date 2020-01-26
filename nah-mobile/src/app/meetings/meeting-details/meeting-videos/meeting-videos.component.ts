import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AppHttpClient } from 'src/app/utils';

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
  constructor(private http: AppHttpClient, private domSanitizer: DomSanitizer) { }

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
  selfUrl(video:any) {
    video.selfPath = this.domSanitizer.bypassSecurityTrustResourceUrl(video.videoPath);
    return video;
  }

}
