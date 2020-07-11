import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-videos-list',
  templateUrl: './youtube-videos-list.component.html',
  styleUrls: ['./youtube-videos-list.component.scss'],
})
export class YoutubeVideosListComponent implements OnInit {
  @Input() videos: any[] = [];
  videoPaths = [];
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.videoPaths = this.videos.map(video => {
      // video.videoPath = this.selfUrl(video);
      return this.selfUrl(video);
    });
  }
  selfUrl(video: any) {
    video.selfPath = this.domSanitizer.bypassSecurityTrustResourceUrl(video.videoPath);
    return video;
  }

}
