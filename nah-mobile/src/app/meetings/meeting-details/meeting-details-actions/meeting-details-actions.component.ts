import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { ReportComponent } from 'src/app/shared/report/report.component';

@Component({
  selector: 'app-meeting-details-actions',
  templateUrl: './meeting-details-actions.component.html',
  styleUrls: ['./meeting-details-actions.component.scss'],
})
export class MeetingDetailsActionsComponent implements OnInit {
  @Input() meetingId:any;
  constructor(private popoverController: PopoverController,public modalController: ModalController) { }

  ngOnInit() {}
  async DismissClick() {
    await this.popoverController.dismiss();
  }
  async reportModal() {
    this.DismissClick();
    const modal = await this.modalController.create({
      component: ReportComponent,
      componentProps:{
        meetingId:this.meetingId
      },
      cssClass: 'group-create-modal2'
    });
    return await modal.present();
  }

}
