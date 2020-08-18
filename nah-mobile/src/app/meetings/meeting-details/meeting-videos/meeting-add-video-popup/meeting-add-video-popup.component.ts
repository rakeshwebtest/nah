import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { AppHttpClient } from 'src/app/utils';
import { ModalController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-meeting-add-video-popup',
  templateUrl: './meeting-add-video-popup.component.html',
  styleUrls: ['./meeting-add-video-popup.component.scss']
})
export class MeetingAddVideoPopupComponent implements OnInit {
  @Input() meetingId: any;

  form = new FormGroup({});
  model: any = {};

  title = "Add Video";
  modelVideoPath: any;
  trustedVideoUrl: SafeResourceUrl;
  fields: FormlyFieldConfig[] = [{
    key: 'videoPath',
    type: 'input',
    wrappers: ['vertical'],
    className: 'ion-no-padding no-label',
    templateOptions: {
      pattern: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
      label: 'Paste Youtube URL here',
      placeholder: 'Paste Youtube URL here',
      required: true,
    }
  }];

  constructor(private modalCtrl: ModalController, private http: AppHttpClient) { }

  ngOnInit() { }
  addVideo() {

    let embedPath = 'https://www.youtube.com/embed/' + this.getId(this.model.videoPath);
    const payload = {
      meetingId: this.meetingId,
      videoPath: embedPath
    };
    this.http.post('meeting/video', payload).subscribe(res => {
      this.modelVideoPath = null;
      this.dismiss(res);
    });
  }
  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    if (data)
      this.modalCtrl.dismiss(data.data);
    this.modalCtrl.dismiss(null);

  }

  getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }
  openWeb() {
    // window.open('https://www.youtube.com/', '_blank');
    // const browser = this.iab.create('https://www.youtube.com/', '_system', { location: 'yes', hardwareback: 'yes', toolbar: 'yes' });
    // browser.show();
  }


}
