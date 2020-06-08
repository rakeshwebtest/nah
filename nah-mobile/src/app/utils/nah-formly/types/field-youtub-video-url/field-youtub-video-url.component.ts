import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-field-youtub-video-url',
  templateUrl: './field-youtub-video-url.component.html',
  styleUrls: ['./field-youtub-video-url.component.scss'],
})
export class FieldYoutubVideoUrlComponent extends FieldType {
  videoPaths = [];
  youtubeUrl = null;
  constructor(private domSanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() { }
  addVideo() {
    if (this.youtubeUrl) {
      const id = this.getId(this.youtubeUrl);
      if (id) {
        let embedPath = 'https://www.youtube.com/embed/' + id;
        const safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(embedPath);
        this.videoPaths.push(safeUrl);
        this.youtubeUrl = null;
        console.log('this.videoPaths',this.videoPaths);
        this.formControl.setValue(this.videoPaths);
      }
    }
  }
  deleteVideo(inx) {
    this.videoPaths.splice(inx, 1);
    this.formControl.setValue(this.videoPaths);
  }

  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

}
