import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { ReportComponent } from 'src/app/shared/report/report.component';
import { AppHttpClient } from 'src/app/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-meeting-details-actions',
  templateUrl: './meeting-details-actions.component.html',
  styleUrls: ['./meeting-details-actions.component.scss'],
})
export class MeetingDetailsActionsComponent implements OnInit {
  @Input() meetingId: any;
  @Input() meeting: any;
  @Input() userInfo: any;

  constructor(private popoverController: PopoverController,
    private http: AppHttpClient,
    private activeRouter: ActivatedRoute,
    private nativeStorage: Storage,
    private route: Router,
    private alertCtrl: AlertController, public modalController: ModalController) { }

  ngOnInit() { }
  async DismissClick() {
    await this.popoverController.dismiss();
  }
  async reportModal() {
    this.DismissClick();
    const modal = await this.modalController.create({
      component: ReportComponent,
      componentProps: {
        meetingId: this.meetingId,
        meeting: this.meeting
      },
      cssClass: 'group-create-modal2'
    });
    return await modal.present();
  }
  editMeeting() {
    this.DismissClick();
    this.nativeStorage.set('meeting_edit', this.meeting).then(res => {

      this.route.navigate(['meeting/edit/' + this.meeting.id]);
    })
  }

  async deleteMeetingConfirm() {
    this.DismissClick();
    let alert = await this.alertCtrl.create({
      message: 'Do you want to delete this Meeting?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.deleteMeeting();
          }
        }
      ]
    });
    await alert.present();
  }

  deleteMeeting() {
    this.DismissClick();
    this.http.delete('meeting/' + this.meeting.id).subscribe(res => {
      this.route.navigate(['dashboard/type/my-meeting']);

    });

  }

  async cancelMeeting() {
    this.DismissClick();
    let alert = await this.alertCtrl.create({
      message: 'Do you want to cancel this Meeting?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.meeting.isCanceled = 1;
            this.http.get('meeting/cancel/' + this.meeting.id).subscribe(res => {
            });
          }
        }
      ]
    });
    await alert.present();
  }

}
