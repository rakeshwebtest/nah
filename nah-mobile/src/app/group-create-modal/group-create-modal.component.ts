import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { AppHttpClient } from '../utils';

@Component({
  selector: 'app-group-create-modal',
  templateUrl: './group-create-modal.component.html',
  styleUrls: ['./group-create-modal.component.scss'],
})
export class GroupCreateModalComponent implements OnInit {

  newGroupName: string;
  constructor(private modalCtrl: ModalController, private authService: AuthenticationService,
    private alertController:AlertController,
     private http: AppHttpClient) { }

  ngOnInit() {

  }
  updateSignIn() {
    const user = this.authService.getUserInfo();

    this.http.post('group', { name: this.newGroupName, createdBy: user.id }).subscribe(res => {
      this.dismiss();
    },err=>{
       console.log('error',err.error.message);
       this.presentAlert(err.error.message);
    });

  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
